import type { Transport } from "../../interfaces/Transport"
import type { TreeFacade } from "./TreeFacade"
import {
  createCommandExecutor,
  createCommandSender,
  createMethodLookup,
  type CommandLookup
} from "../../interfaces/CommandBus"

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
