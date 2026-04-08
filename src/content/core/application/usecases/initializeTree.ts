import type { Tree } from "@core/domain/entities/Tree"
import type { TreeStore } from "../ports/TreeStore"

// input port for input adapters to inject
export type InitializeTreeUseCase = ReturnType<
  typeof createInitializeTreeUseCase
>

// inject output port with currying
export function createInitializeTreeUseCase(treeStore: TreeStore) {
  // run at dom region update
  return function initializeTree(tree: Tree) {
    // const treeData = searchRegionStore.regionToTree()
    treeStore.setTree(tree)
  }
}
