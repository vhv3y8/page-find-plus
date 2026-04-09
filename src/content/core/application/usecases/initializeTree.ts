import type { Tree } from "@core/domain/entities/Tree"
import type { TreeStore } from "../ports/TreeStore"
import type { DevLogger } from "@infra/ports/DevLogger"

// input port for input adapters to inject
export type InitializeTreeUseCase = ReturnType<
  typeof createInitializeTreeUseCase
>

// inject output port with currying
export function createInitializeTreeUseCase(
  treeStore: TreeStore,
  devLogger?: DevLogger
) {
  // run at dom region update
  return function initializeTree(tree: Tree) {
    // const treeData = searchRegionStore.regionToTree()
    devLogger?.log("Initialize Tree", tree)
    treeStore.setTree(tree)
  }
}
