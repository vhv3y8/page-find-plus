import { createDispatcher } from "@infra/adapters/webworker/Dispatcher"
import { createTreeCommandExecutor } from "./TreeCommandBus"
import { createTreeImplFacade } from "./TreeFacade"
// import { workerDevLogger } from "@infra/adapters/devlogger/webworker"

console.log("hi from web worker")
// workerDevLogger.log("HI FROM WEBWORKER")

const treeImplFacade = createTreeImplFacade()

const commandExecutor = createTreeCommandExecutor(treeImplFacade)
const dispatcher = createDispatcher(commandExecutor)

self.addEventListener("message", (e: MessageEvent) => {
  console.log("[message}", e.data)
  dispatcher.handle(e.data)
})
