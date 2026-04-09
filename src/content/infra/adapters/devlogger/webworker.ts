import { DevLogger } from "@infra/ports/DevLogger"

export const workerDevLogger = new DevLogger([() => "WEBWORKER"])
