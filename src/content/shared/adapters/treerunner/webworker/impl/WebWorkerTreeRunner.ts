// This file runs on main thread (content script).
// register worker file with vite query suffixes
import WebWorker from "../webworker?worker"

import type { Command } from "../../../../../core/application/models/dto/TreeCommand"
import type { TreeRunner } from "src/content/shared/ports/TreeRunner"
import type { DOMRegionSerializer } from "../../../../ports/serializer/DOMRegionSerializer"

let worker: Worker = new WebWorker()
worker.onmessage = (e: { data: { response: Response } }) => {
  const response = e.data.response
  // handle worker response at main
  console.log("Response from Worker:", e.data)
}

export const WebWorkerTreeRunner: TreeRunner = {
  // send command to worker
  run(command: Command) {
    if (command.cmd === "INITIALIZE") {
      // transfer array buffer
      worker!.postMessage({ command }, [command.treeData])
    } else {
      worker!.postMessage({ command })
    }
  }
}

export const ArrayBufferSerializer: DOMRegionSerializer = {
  serialize(domRegion) {
    // TODO
  }
}

export function createWebWorkerTreeRunner(
  serializer: DOMRegionSerializer
  // @ts-ignore
): TreeRunner {
  // return WebWorkerTreeRunner
}

// when running tree use cases at web worker, large datas can be transfered by passing ArrayBuffer to postMessage
function serializeDOMRegion() {}
