import type { UpdateTreeNodeUseCase } from "@core/application/usecases/updateTreeNode"

// inject use cases with currying
export function createMutationHandler(updateTreeNode: UpdateTreeNodeUseCase) {
  return function mutationHandler() {}
}
