import type { TreeStore } from "@core/domain/ports/TreeStore"
import type { InitializeCommand } from "./dto/Command"

// search region이 업데이트 될 때 실행
export function initializeTree(
  command: InitializeCommand,
  treeStore: TreeStore
) {
  const { treeData } = command

  // treeStore.initializeTree(tree)
}
