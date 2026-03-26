import type { TreeStore } from "@core/application/ports/TreeStore"
import { globalTreeStore } from "@core/adapters/tree/globalTreeStore"

import { createInitializeTreeUseCase } from "@core/application/usecases/initializeTree"
import { createSearchUseCase } from "@core/application/usecases/search"
import { createUpdateTreeNodeUseCase } from "@core/application/usecases/updateTreeNode"

import type { Command } from "@core/application/dto/Command"

export type TreeUseCaseRegistry = Record<Command["cmd"], (...any: any) => any>

// This is needed because web worker is different file entry to content script main.
// so all codes that's possible to run at web worker should be here
// it's up to composition root(`app/bootstrap.ts`) to whether run these at main thread or worker thread
export function runTreeBootstrap(): TreeUseCaseRegistry {
  // 1. Infra / Adapter Impls
  const treeStore: TreeStore = globalTreeStore

  // 2. Create Use Cases (DI)
  const initializeTree = createInitializeTreeUseCase(treeStore)
  const search = createSearchUseCase(treeStore)
  const updateTreeNode = createUpdateTreeNodeUseCase(treeStore)

  // 3. Input Adapters
  // Input adapters exists on different file entries, so it's handled by TreeRunner impl.
  // return use cases so that runner can inject these to adapters.

  // create use case registry
  const treeUseCaseRegistry: TreeUseCaseRegistry = {
    INITIALIZE: initializeTree,
    SEARCH: search,
    UPDATE_NODE: updateTreeNode
  }

  return treeUseCaseRegistry
}
