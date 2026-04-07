import { createDispatcher } from "@infra/adapters/webworker/Dispatcher"
import { createTreeCommandExecutor } from "./TreeCommandBus"
import { createTreeImplFacade } from "./TreeFacade"

const treeImplFacade = createTreeImplFacade()

const commandExecutor = createTreeCommandExecutor(treeImplFacade)
const dispatcher = createDispatcher(commandExecutor)

self.addEventListener("message", (e: MessageEvent) => {
  dispatcher.handle(e.data)
})
