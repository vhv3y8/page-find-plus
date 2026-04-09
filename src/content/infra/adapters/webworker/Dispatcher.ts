import type { createCommandExecutor } from "@infra/ports/CommandBus"
import type { WebWorkerSerializer } from "./WebWorkerTransport"
import type { DevLogger } from "@infra/ports/DevLogger"

export type Dispatcher = {
  handle(any: any): Promise<any>
}

export function createDispatcher(
  serializer: WebWorkerSerializer,
  executor: ReturnType<typeof createCommandExecutor>,
  devLogger?: DevLogger
) {
  // queue, async return
  const dispatcher: Dispatcher = {
    async handle(payload) {
      devLogger?.log("Payload", payload)
      const deserialized = serializer.deserialize(payload)
      devLogger?.log("Deserialized", deserialized)
      return executor(deserialized)
    }
  }
  return dispatcher
}
