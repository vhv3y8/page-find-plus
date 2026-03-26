import type { TreeStore } from "../ports/TreeStore"
import type { InitializeCommand } from "../dto/Command"

// input port for input adapters to inject
export type InitializeTreeUseCase = ReturnType<
  typeof createInitializeTreeUseCase
>

// inject output port with currying
export function createInitializeTreeUseCase(treeStore: TreeStore) {
  // search region이 업데이트 될 때 실행
  return function initializeTree(command: InitializeCommand) {
    const { treeData } = command

    // treeStore.initializeTree(treeData)
  }
}
