// core
import {
  createInitializeTreeUseCase,
  type InitializeTreeUseCase
} from "@core/application/usecases/initializeTree"
import {
  createSearchUseCase,
  type SearchUseCase
} from "@core/application/usecases/search"
import {
  createUpdateTreeNodeUseCase,
  type UpdateTreeNodeUseCase
} from "@core/application/usecases/updateTreeNode"
import type { TreeStore } from "@core/application/ports/TreeStore"
import { globalTreeStore } from "@core/adapters/tree/impl/globalTreeStore"
// infra
import type { Serializer, Transport } from "../../interfaces/Transport"
import { TransportNameResolver } from "../../impls/TransportNameResolver"
import { createWebWorkerTransport } from "../../impls/webworker/WebWorkerTransport"
import type { Facade } from "../../interfaces/Facade"
import { createTreeCommandSender, treeCommandLookup } from "./TreeCommandBus"
import type { DevLogger } from "../../interfaces/DevLogger"
import {
  createJSONSerializer,
  type TransferableSerializer
} from "../../impls/webworker/TransferableSerializer"
// web worker with vite
import TreeWebWorker from "./treeWebWorker?worker&inline"

export interface TreeFacade extends Facade {
  initializeTree: InitializeTreeUseCase
  search: SearchUseCase
  updateTreeNode: UpdateTreeNodeUseCase
}

// use case impls
export function createTreeImplFacade(devLogger?: DevLogger): TreeFacade {
  // adapter
  const treeStore: TreeStore = globalTreeStore
  // use case
  const treeImplFacade: TreeFacade = {
    initializeTree: createInitializeTreeUseCase(treeStore, devLogger),
    search: createSearchUseCase(treeStore),
    updateTreeNode: createUpdateTreeNodeUseCase(treeStore)
  }
  return treeImplFacade
}

// web worker transport
export function createWebWorkerTreeFacade(devLogger?: DevLogger): TreeFacade {
  // infra
  devLogger?.log("creating worker")
  const treeWebWorker = new TreeWebWorker()
  devLogger?.log("creating worker done")
  const serializer: TransferableSerializer = createJSONSerializer(devLogger)
  const treeWebWorkerTransport: Transport = createWebWorkerTransport(
    treeWebWorker,
    serializer,
    devLogger
  )
  const sendCommand = createTreeCommandSender(treeWebWorkerTransport)
  // set use cases
  const treeFacade = {} as TreeFacade
  for (const useCaseName of Object.keys(treeCommandLookup)) {
    treeFacade[useCaseName] = (...payload: any) =>
      sendCommand(useCaseName, payload)
  }
  return treeFacade
}

//
export function createDynamicTransportTreeFacade(devLogger?: DevLogger): {
  transportNameResolver: TransportNameResolver
  treeFacade: TreeFacade
} {
  const treeMainFacade: TreeFacade = createTreeImplFacade()
  const treeWebWorkerFacade: TreeFacade = createWebWorkerTreeFacade(devLogger)
  const transportNameResolver = new TransportNameResolver()

  const treeDynamicFacade = {} as TreeFacade
  for (const useCaseName of Object.keys(treeCommandLookup)) {
    treeDynamicFacade[useCaseName] = (...payload: any) => {
      // get transport name dynamically
      const transportName = transportNameResolver.getStrategy()
      devLogger?.log("Getting Dynamic Transport", transportName)
      // run use case
      if (transportName === "main") {
        treeMainFacade[useCaseName](payload)
      } else if (transportName === "webworker") {
        treeWebWorkerFacade[useCaseName](payload)
      }
    }
  }
  return {
    transportNameResolver,
    treeFacade: treeDynamicFacade
  }
}
