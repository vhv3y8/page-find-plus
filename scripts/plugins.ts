import { type Plugin } from "vite"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"
import { build as runEsbuild } from "esbuild"
import { globSync, rmSync } from "node:fs"

export function ProtobufPlugin(): Plugin {
  // pnpm i -D @bufbuild/buf ts-proto && pnpm i @bufbuild/protobuf
  // recommendation: git ignore *.proto.ts files, when generating it next to .proto files.
  const projectRoot = path.join(fileURLToPath(import.meta.url), "../..")
  // const bufOutDir = "node_modules/.cache/protobuf-plugin-gen"
  const bufOutDir = "." // generate .ts file next to .proto file

  function runBufGenerateTsFileSync(filePath: string) {
    const bufConfig = {
      version: "v2",
      plugins: [
        {
          // use ts-proto
          local: "protoc-gen-ts_proto",
          out: bufOutDir,
          opt: [
            // .proto.ts
            "fileSuffix=.proto",
            // int64 as string
            "forceLong=string",
            // no toJSON()/fromJSON()
            "outputJsonMethods=false",
            "esModuleInterop=true"
          ]
        }
      ]
    }
    const bufTemplateArg = JSON.stringify(bufConfig)
    // run buf and create ts file
    execSync(
      `npx buf generate --template '${bufTemplateArg}' --path ${filePath}`
    )
  }

  return {
    name: "scripts/plugins:protobuf-plugin",
    buildStart() {
      const allProtoFiles = globSync("**/*.proto")
      for (const protoFilePath of allProtoFiles) {
        // generate ts file using `buf generate` and `ts-proto`
        // use generated ts file as IDE type hint
        runBufGenerateTsFileSync(protoFilePath)
      }
    },
    // this is needed to use `from "xx.proto"` instead of `from "xx.proto.ts"`
    load: {
      filter: { id: /(.*).proto$/ },
      async handler(id) {
        const idRelativePath = path.relative(projectRoot, id)
        // .proto -> .proto.ts
        const { dir: idDir, name: idFileName } = path.parse(idRelativePath)
        const bufGenProtoTsPath = path.join(
          projectRoot,
          bufOutDir,
          idDir,
          `${idFileName}.proto.ts`
        )
        // run esbuild to get js code
        const esbuildResult = await runEsbuild({
          entryPoints: [bufGenProtoTsPath],
          write: false
        })
        const protoJsCode = esbuildResult.outputFiles[0].text
        return protoJsCode
      }
    }
    // async hotUpdate({ type, file }) {
    //   const relativePath = path.relative(projectRoot, file)
    //   // console.error("[ProtobufPlugin] [hotUpdate]", {
    //   //   type,
    //   //   file: relativePath
    //   // })
    //   if (type === "create") {
    //     runBufGenerateTsFileSync(file)
    //     console.error(`[ProtobufPlugin] generated ts for ${relativePath}`)
    //   } else if (type === "update") {
    //     runBufGenerateTsFileSync(file)
    //     console.error(`[ProtobufPlugin] updated ts for ${relativePath}`)
    //   } else if (type === "delete") {
    //     rmSync(file)
    //     console.error(`[ProtobufPlugin] deleted ts of ${relativePath}`)
    //   }
    // }
  }
}

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
