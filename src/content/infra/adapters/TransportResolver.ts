import type { DynamicStrategy } from "@infra/ports/DynamicStrategy"
import type { Transport } from "@infra/ports/Transport"

type TransportName = "main" | "webworker"
export type TransportRecord = Partial<Record<TransportName, Transport>>

export interface TransportResolver extends DynamicStrategy {
  getStrategy(): Transport
  setTransportTo(name: TransportName): void
}

export function createTransportResolver(
  transports: TransportRecord
): TransportResolver {
  let treeTransportName: TransportName = "webworker"

  const treeTransportResolver = {
    getStrategy() {
      return transports[treeTransportName]!
    },
    setTransportTo(name) {
      treeTransportName = name
    }
  } satisfies TransportResolver
  return treeTransportResolver
}
