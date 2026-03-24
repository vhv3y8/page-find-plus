// import type { TreeRunner } from "@core/application/ports/TreeRunner"
import { WebWorkerTreeRunner } from "../common/adapters/treerunner/webworker/impl/WebWorkerTreeRunner"
import type { TreeRunner } from "../common/application/ports/TreeRunner"

// run tree codes at web worker
export const treeUseCaseRunner: TreeRunner = WebWorkerTreeRunner
