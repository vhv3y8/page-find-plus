import { type Plugin } from "vite"
import { Worker } from "node:worker_threads"
import path from "node:path"

// export function LogIdPlugin(): Plugin {
//   return {
//     name: "log-id",
//     load: {
//       filter: { id: /(.*).css$/ },
//       handler(id, options) {
//         console.error(`[ID] [${id}]`)
//       }
//     },
//     transform: {
//       filter: { id: /(.*).css$/ },
//       handler(id, options) {
//         console.error(`[ID] [${id}]`)
//       }
//     }
//   }
// }

// const projectRoot = path.join(import.meta.url, "../..")
// console.error("[projectRoot]", projectRoot)
// export function CustomWorkerPlugin(): Plugin {
//   return {
//     name: "build-script:custom-worker-plugin",
//     load: {
//       filter: { id: /\?inlineWorker/ },
//       async handler(id, options) {
//         console.error(`[id] [${id}]`)
//         const filePath = id.replace("?inlineWorker", "")
//         const buildInlineWorker = new Worker(
//           "./scripts/run/bundleInlineWorker.js",
//           { workerData: { path: filePath } }
//         )
//         buildInlineWorker.on("online", () => {
//           console.log("✅ worker started")
//         })
//         buildInlineWorker.on("message", (res) => {
//           console.error("[message]", res)
//         })

//         return new Promise((res) => {
//           buildInlineWorker.on("message", ({ workerContent }) => {
//             console.error("[workerContent from worker]", workerContent)
//             res(workerContent)
//           })
//         })
//       }
//     }
//   }
// }
