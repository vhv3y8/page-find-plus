import { DevLogger } from "@infra/interfaces/DevLogger"

export const workerDevLogger = new DevLogger([() => "WEBWORKER"])
