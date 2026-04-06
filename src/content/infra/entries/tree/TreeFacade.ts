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
import type { Transport } from "@infra/ports/Transport"
import type { Serializer } from "@infra/ports/Serializer"
import { type TransportResolver } from "@infra/adapters/TransportResolver"
import { createWebWorkerTransport } from "@infra/adapters/webworker/WebWorkerTransport"
import { createTransferableSerializer } from "@infra/adapters/webworker/TransferableSerializer"
import type { Facade } from "@infra/ports/Facade"
import { createTreeCommandSender, treeCommandLookup } from "./TreeCommandBus"
// web worker with vite
import TreeWebWorker from "./treeWebWorker?worker&inline"

export interface TreeFacade extends Facade {
  initializeTree: InitializeTreeUseCase
  search: SearchUseCase
  updateTreeNode: UpdateTreeNodeUseCase
}

// use case impls
export function createTreeImplFacade(): TreeFacade {
  // adapter
  const treeStore: TreeStore = globalTreeStore
  // use case
  const treeImplFacade: TreeFacade = {
    initializeTree: createInitializeTreeUseCase(treeStore),
    search: createSearchUseCase(treeStore),
    updateTreeNode: createUpdateTreeNodeUseCase(treeStore)
  }
  return treeImplFacade
}

// web worker transport
export function createWebWorkerTreeFacade(): TreeFacade {
  // infra
  const treeWebWorker = new TreeWebWorker()
  const transferableSerializer: Serializer = createTransferableSerializer()
  const treeWebWorkerTransport: Transport = createWebWorkerTransport(
    treeWebWorker,
    transferableSerializer
  )
  const treeCommandSender = createTreeCommandSender(treeWebWorkerTransport)
  const treeFacade = {}
  for (const useCaseName of Object.keys(treeCommandLookup)) {
    treeFacade[useCaseName] = (...payload: any) =>
      treeCommandSender(useCaseName, payload)
  }
  // command bus
  // const treeCommandBus = createTreeCommandBus()
  // map treeWebWorkerTransport.send(Command) for each
  // const treeFacade: TreeFacade = {
  //   initializeTree: (...payload) =>
  //     treeWebWorkerTransport.send(
  //       treeCommandBus.toCommand("initializeTree", payload)
  //     ),
  //   search: (...payload) =>
  //     treeWebWorkerTransport.send(treeCommandBus.toCommand("search", payload)),
  //   updateTreeNode: (...payload) =>
  //     treeWebWorkerTransport.send(
  //       treeCommandBus.toCommand("updateTreeNode", payload)
  //     )
  // }
  return treeFacade
}

//
export function createDynamicTransportTreeFacade(): {
  treeFacade: TreeFacade
  transportResolver: TransportResolver
} {
  const transportResolver = createTransportResolver()

  const treeMainFacade: TreeFacade = createTreeImplFacade()
  // const treeWebWorkerFacade: TreeFacade =
  const getCurrentTransport = () => transportResolver.getStrategy()
  const runUseCaseDynamically = (payload: any) => {
    // command bus?
    const transport = getCurrentTransport()
    transport.send(payload)
  }

  // const treeFacade: TreeFacade = {
  //   initializeTree: ,
  //   search: ,
  //   updateTreeNode:
  // }
  // return treeFacade
}
