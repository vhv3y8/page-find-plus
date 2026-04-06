import type { DynamicStrategy } from "../ports/DynamicStrategy"
import type { Transport } from "@infra/ports/Transport"

type TransportName = "main" | "webworker"
export type TransportRecord = Partial<Record<TransportName, Transport>>

export class TransportResolver implements DynamicStrategy {
  constructor(
    public transports: TransportRecord,
    public transportName: TransportName
  ) {}

  getStrategy(): Transport {
    return this.transports[this.transportName]!
  }
  setStrategy(name: TransportName) {
    this.transportName = name
  }
}
