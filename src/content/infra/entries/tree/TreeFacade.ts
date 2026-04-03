import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"
import type { SearchUseCase } from "@core/application/usecases/search"
import type { UpdateTreeNodeUseCase } from "@core/application/usecases/updateTreeNode"
import {
  createTransportResolver,
  type TransportRecord,
  type TransportResolver
} from "@infra/adapters/TransportResolver"
import { createWebWorkerTransport } from "@infra/adapters/webworker/WebWorkerTransport"

import type { Transport } from "@infra/ports/Transport"
import { createTransferableSerializer } from "@infra/adapters/webworker/TransferableSerializer"
import TreeWebWorker from "./treeWebWorker?worker&inline"

export interface TreeFacade {
  initializeTree: InitializeTreeUseCase
  search: SearchUseCase
  updateTreeNode: UpdateTreeNodeUseCase
}

export function createTreeFacade(
  transportResolver: TransportResolver
): TreeFacade {
  // const getTransport: () => Transport = () => transportResolver.getStrategy()

  const treeFacade = {} satisfies TreeFacade
  return treeFacade
}

// @ts-ignore
// export const TreeWebWorkerFacade = {} satisfies TreeFacade
// export function createTreeWebWorkerFacade() {
//   const webWorkerTransport: Transport = createWebWorkerTransport()
// }

// export function createTreeImplFacade(): TreeFacade {
//   const treeImplFacade = {} satisfies TreeFacade
//   return treeImplFacade
// }
