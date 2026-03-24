// This file runs on main thread (content script).
import type { TreeRunner } from "@core/application/ports/TreeRunner"
import type { Command } from "../../../../../core/application/usecases/dto/Command"

import WebWorker from "../webworker?worker"

let worker: Worker | null = null

export const WebWorkerTreeRunner: TreeRunner = {
  run(command: Command) {
    // initialize worker if not set
    if (!worker) {
      worker = new WebWorker()
      worker.onmessage = (e) => {
        console.log("Worker로부터 응답:", e.data)
      }
    }

    // send command to worker
    if (command.cmd === "INITIALIZE") {
      // transfer array buffer
      worker!.postMessage({ command }, [command.treeData])
    } else {
      worker!.postMessage({ command })
    }
  }
}
