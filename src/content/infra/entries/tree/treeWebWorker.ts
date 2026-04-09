import { createDispatcher } from "@infra/adapters/webworker/Dispatcher"
import { createTreeCommandExecutor } from "./TreeCommandBus"
import { createTreeImplFacade } from "./TreeFacade"
import { workerDevLogger } from "@infra/adapters/devlogger/webworker"
import { createTransferableSerializer } from "@infra/adapters/webworker/WebWorkerTransport"

workerDevLogger.log("HI FROM WEBWORKER")

const treeImplFacade = createTreeImplFacade(workerDevLogger)

const serializer = createTransferableSerializer(workerDevLogger)
const commandExecutor = createTreeCommandExecutor(treeImplFacade)
const dispatcher = createDispatcher(
  serializer,
  commandExecutor,
  workerDevLogger
)

self.addEventListener("message", (e: MessageEvent) => {
  // workerDevLogger.log("[message]", e.data)
  dispatcher.handle(e.data)
})
