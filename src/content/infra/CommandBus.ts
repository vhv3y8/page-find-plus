import type { Invert, ValueOf } from "src/types"
import type { Transport } from "./ports/Transport"
import type { Facade } from "./ports/Facade"

// lookup
export type CommandLookup<F extends Facade> = Record<keyof F, string>
export type MethodLookup<F extends Facade> = Invert<CommandLookup<F>>
// command
type Command<F extends Facade, C extends keyof MethodLookup<F>> = {
  type: C
  payload: Parameters<F[Extract<MethodLookup<F>[C], keyof F>]>
}

export function createMethodLookup<
  F extends Facade,
  Lookup extends CommandLookup<F>
>(lookup: Lookup): MethodLookup<F> {
  const methodLookup: any = {}
  for (const methodName of Object.keys(lookup)) {
    const commandName = lookup[methodName as keyof Lookup]
    methodLookup[commandName] = methodName
  }
  return methodLookup
}

// command bus
export function createUseCaseProxy() {
  // return new Proxy({}, )
}

export function createCommandSender<F extends Facade>(
  transport: Transport,
  commandLookup: CommandLookup<F>
) {
  return function send(methodName: keyof F, parameters: any) {
    transport.send({ type: commandLookup[methodName], payload: parameters })
  }
}

export function createCommandExecutor<F extends Facade>(
  facade: F,
  methodLookup: MethodLookup<F>
) {
  return function execute<C extends keyof MethodLookup<F>>(
    command: Command<F, C>
  ) {
    const methodName = methodLookup[command.type] as Extract<
      MethodLookup<F>[C],
      keyof F
    >
    const method = facade[methodName] as (
      ...args: Command<F, C>["payload"]
    ) => unknown
    method(...command.payload)
  }
}
