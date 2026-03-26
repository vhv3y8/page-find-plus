import type { TreeStore } from "../ports/TreeStore"
import type { UpdateNodeCommand } from "../dto/Command"

// input port for input adapters to inject
export type UpdateTreeNodeUseCase = ReturnType<
  typeof createUpdateTreeNodeUseCase
>

// inject output port with currying
export function createUpdateTreeNodeUseCase(treeStore: TreeStore) {
  // 옵저버에서 dom 트리가 바뀔 때마다 실행
  return function updateTreeNode(command: UpdateNodeCommand) {}
}
