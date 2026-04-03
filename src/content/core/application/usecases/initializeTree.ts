import type { TreeStore } from "../ports/TreeStore"
import type { InitializeCommand } from "../models/dto/TreeCommand"

// input port for input adapters to inject
export type InitializeTreeUseCase = ReturnType<
  typeof createInitializeTreeUseCase
>

// inject output port with currying
export function createInitializeTreeUseCase(treeStore: TreeStore) {
  // run at dom region update
  return function initializeTree(command: InitializeCommand) {
    // @ts-ignore
    const { treeData } = command

    // treeStore.initializeTree(treeData)
  }
}
