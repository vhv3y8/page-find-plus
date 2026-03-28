import type { TreeStore } from "../../domain/ports/TreeStore"
import type { UpdateNodeCommand } from "../dto/Command"

// input port for input adapters to inject
export type UpdateTreeNodeUseCase = ReturnType<
  typeof createUpdateTreeNodeUseCase
>

// inject output port with currying
export function createUpdateTreeNodeUseCase(treeStore: TreeStore) {
  // run at dom tree change with observer
  return function updateTreeNode(command: UpdateNodeCommand) {}
}
