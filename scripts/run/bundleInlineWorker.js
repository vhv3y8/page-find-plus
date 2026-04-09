import { parentPort, workerData } from "node:worker_threads"
import { build as viteBuild } from "vite"

// console.error("[bundleInlineWorker] building worker string..")
// console.error("[bundleInlineWorker] [workerData]", workerData)

// export function workerEntryConfig(entry) {
//   const workerConfig = {
//     root: "src",
//     optimizeDeps: {
//       noDiscovery: true
//     },
//     build: {
//       lib: {
//         entry,
//         name: "workerInstance",
//         formats: ["iife"]
//       },
//       write: false,
//       minify: true
//       // outDir: "dist-worker",
//       // emptyOutDir: false
//     },
//     configFile: false,
//     // cacheDir: "node_modules/.vite-worker",
//     plugins: []
//   }
//   console.error("[workerConfig]", workerConfig)
//   return workerConfig
// }

// async function buildInlineWorker() {
//   try {
//     // use js object sent from main
//     const result = await viteBuild(workerEntryConfig(workerData.path))
//     console.error("[bundleInlineWorker] [result]", result)
//     // send result as js object
//     // parentPort?.postMessage({
//     //   success: true,
//     //   output: result[0].output[0].code
//     // })
//   } catch (error) {
//     // parentPort?.postMessage({ success: false, error: error?.message })
//     console.error("[bundleInlineWorker] [error]", error)
//   }
// }

// buildInlineWorker()
