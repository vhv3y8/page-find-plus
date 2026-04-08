import { build as viteBuild, type InlineConfig, type Plugin } from "vite"
import { workerEntryConfig } from "./config"

export function LogIdPlugin(): Plugin {
  return {
    name: "log-id",
    load: {
      filter: { id: /(.*).css$/ },
      handler(id, options) {
        console.error(`[ID] [${id}]`)
      }
    },
    transform: {
      filter: { id: /(.*).css$/ },
      handler(id, options) {
        console.error(`[ID] [${id}]`)
      }
    }
  }
}

let isInternalBuilding = false
export function CustomWorkerPlugin(): Plugin {
  return {
    name: "build-script:custom-worker-plugin",
    load: {
      filter: { id: /\?inlineWorker/ },
      async handler(id, options) {
        if (isInternalBuilding) return null
        console.error(`[id] [${id}]`)
        const filePath = id.replace("?inlineWorker", "")
        try {
          isInternalBuilding = true
          const workerConfig: InlineConfig = workerEntryConfig(filePath)
          const bundle = await viteBuild(workerConfig)
          console.error(`[bundle]`, bundle)
          if (typeof bundle === "object" && "output" in bundle) {
            const workerCode = bundle.output[0].code
            console.error(`[workerCode]`, workerCode)
            const output = `
            const jsContent = ${JSON.stringify(workerCode)};
            const blob = new Blob([jsContent], { type: "text/javascript" });
            export default function WorkerWrapper() {
              const objURL = URL.createObjectURL(blob);
              const worker = new Worker(objURL);
              // 생성 직후 URL 해제해서 메모리 누수 방지 (브라우저 특성 따라 조절)
              return worker;
            }
          `
            return output
          } else {
            console.error("[no output in bundle]")
            // return ""
          }
          isInternalBuilding = false
        } catch (e) {
          console.error("[error]", e)
          // return ""
        }
      }
    }
  }
}
