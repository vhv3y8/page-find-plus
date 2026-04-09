import type { DynamicStrategy } from "../ports/DynamicStrategy"

type TransportName = "main" | "webworker"

export class TransportNameResolver implements DynamicStrategy {
  transportName: TransportName
  constructor(initialTransportName: TransportName = "webworker") {
    this.transportName = initialTransportName
  }

  getStrategy(): TransportName {
    return this.transportName
  }
  judgeAndSetStrategy(nodeCount: number) {
    if (1000 < nodeCount) {
      this.transportName = "webworker"
    } else {
      this.transportName = "main"
    }
  }
}
