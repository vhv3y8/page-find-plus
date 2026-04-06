import type { TreeStore } from "../ports/TreeStore"
import type { InitializeCommand } from "../models/dto/TreeCommand"
import type { Tree } from "@core/domain/entities/Tree"

// input port for input adapters to inject
export type InitializeTreeUseCase = ReturnType<
  typeof createInitializeTreeUseCase
>

// inject output port with currying
export function createInitializeTreeUseCase(treeStore: TreeStore) {
  // run at dom region update
  return function initializeTree(treeData: Tree) {
    // @ts-ignore
    // const { treeData } = command
    treeStore.initializeTree(treeData)
  }
}
