import { type Plugin } from "vite"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"
import { build as runEsbuild } from "esbuild"
import { globSync, renameSync } from "node:fs"

export function ProtobufPlugin(): Plugin {
  // pnpm i -D @bufbuild/buf && pnpm i @bufbuild/protobuf
  // and install buf plugin you want to use :
  // pnpm i -D ts-proto
  // pnpm i -D @bufbuild/protoc-gen-es
  const projectRoot = path.join(fileURLToPath(import.meta.url), "../..")
  // const bufOutDir = "node_modules/.cache/protobuf-plugin-gen"
  const bufOutDir = "." // generate .ts file next to .proto file
  // recommend: maybe git ignore *.proto.ts files when generating it next to .proto files.

  function runBufGenerateTsFileSync(
    protoFilePath: string,
    bufGenPlugin: "ts-proto" | "protoc-gen-es" = "ts-proto"
  ) {
    if (bufGenPlugin === "ts-proto") {
      const bufConfig = {
        version: "v2",
        plugins: [
          {
            local: "protoc-gen-ts_proto",
            out: bufOutDir,
            opt: [
              // generate .proto.ts file
              "fileSuffix=.proto",
              // int64 as string
              "forceLong=string",
              // no toJSON() / fromJSON()
              "outputJsonMethods=false",
              "esModuleInterop=true"
            ]
          }
        ]
      }
      const bufTemplateArg = JSON.stringify(bufConfig)
      // run buf and create ts file
      execSync(
        `npx buf generate --template '${bufTemplateArg}' --path ${protoFilePath}`
      )
    } else if (bufGenPlugin === "protoc-gen-es") {
      const bufConfig = {
        version: "v2",
        plugins: [
          {
            local: "protoc-gen-es",
            out: bufOutDir,
            opt: ["target=ts"]
          }
        ]
      }
      const bufTemplateArg = JSON.stringify(bufConfig)
      // run buf and create ts file
      execSync(
        `npx buf generate --template '${bufTemplateArg}' --path ${protoFilePath}`
      )
      // rename _pb.ts -> .proto.ts
      const { dir: protoFileDir, name: protoFileName } =
        path.parse(protoFilePath)
      const dir = path.join(projectRoot, bufOutDir, protoFileDir)
      const bufGenTsPath = path.join(dir, `${protoFileName}_pb.ts`)
      const bufGenProtoTsPath = path.join(dir, `${protoFileName}.proto.ts`)
      renameSync(bufGenTsPath, bufGenProtoTsPath)
    }
  }

  return {
    name: "scripts/plugins:protobuf-plugin",
    buildStart() {
      const allProtoFiles = globSync("**/*.proto")
      for (const protoFilePath of allProtoFiles) {
        // generate ts file using `buf generate` command with `ts-proto` or `@bufbuild/protoc-gen-es`
        // use generated ts file as IDE type hint
        runBufGenerateTsFileSync(protoFilePath)
      }
    },
    // load hook is needed to use `from "xx.proto"` instead of `from "xx.proto.ts"`
    load: {
      filter: { id: /(.*).proto$/ },
      async handler(id) {
        const idRelativePath = path.relative(projectRoot, id)
        // get .proto.ts path
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
