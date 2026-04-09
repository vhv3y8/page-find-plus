import type { Transport } from "@infra/ports/Transport"
import type { TreeFacade } from "./TreeFacade"
import {
  createCommandExecutor,
  createCommandSender,
  createMethodLookup,
  type CommandLookup
} from "@infra/ports/CommandBus"

export const treeCommandLookup = {
  initializeTree: "INITIALIZE",
  search: "SEARCH",
  updateTreeNode: "UPDATE_NODE"
} satisfies CommandLookup<TreeFacade>
const treeMethodLookup = createMethodLookup(treeCommandLookup)

export function createTreeCommandSender(transport: Transport) {
  return createCommandSender(transport, treeCommandLookup)
}
export function createTreeCommandExecutor(facade: TreeFacade) {
  return createCommandExecutor(facade, treeMethodLookup)
}
