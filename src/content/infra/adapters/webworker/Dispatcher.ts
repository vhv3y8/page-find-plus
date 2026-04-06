import type { CommandLookup } from "@infra/CommandBus"
import type { Facade } from "@infra/ports/Facade"

export type Dispatcher = {
  handle(any: any): Promise<any>
}

export function createDispatcher<T extends Facade>(
  lookup: CommandLookup<T>
): Dispatcher {
  const dispatcher = {}
}
