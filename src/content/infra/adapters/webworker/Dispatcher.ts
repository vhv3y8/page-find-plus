import type { createCommandExecutor } from "@infra/ports/CommandBus"

export type Dispatcher = {
  handle(any: any): Promise<any>
}

export function createDispatcher(
  executor: ReturnType<typeof createCommandExecutor>
) {
  // queue, async return
  const dispatcher: Dispatcher = {
    async handle(payload) {
      return executor(payload)
    }
  }
  return dispatcher
}
