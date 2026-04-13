import type { createCommandExecutor } from "@infra/interfaces/CommandBus"
import type { DevLogger } from "@infra/interfaces/DevLogger"
import type { TransferableSerializer } from "./TransferableSerializer"

export type Dispatcher = {
  handle(any: any): Promise<any>
}

export function createDispatcher(
  serializer: TransferableSerializer,
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
