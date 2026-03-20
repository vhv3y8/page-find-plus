import { build as viteBuild, type InlineConfig, type Plugin } from "vite"
// import { execSync } from "child_process"
import manifest from "../public/manifest.json"

import { svelte } from "@sveltejs/vite-plugin-svelte"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"
import fs from "node:fs/promises"
import fsSync from "node:fs"
import archiver from "archiver"

const PRODUCTION = process.env.MODE === "production"

const tsEntries = ["sw.ts"]
const svelteEntries = ["content/content.ts", "options/options.html"]

const commonConfig: InlineConfig = {
  root: "src",
  publicDir: "../public",
  resolve: {
    alias: {
      "@lib": "/lib",
      "@app": "/content/app",
      "@core": "/content/core"
    }
  },
  build: {
    outDir: "../dist",
    rolldownOptions: {
      output: {
        assetFileNames: "[name].css",
        entryFileNames: "[name].js"
      }
    }
  },
  logLevel: "error"
}

async function buildTSEntry(entry: string) {
  const tsConfig: InlineConfig = {
    build: {
      rolldownOptions: {
        input: [entry]
      }
    }
  }

  return build(tsConfig)
}

async function buildSvelteEntry(entry: string) {
  const plugins = [
    svelte({
      compilerOptions: {
        css: "injected"
      }
    }),
    tailwindcss()
  ]

  const svelteConfig: InlineConfig = {
    plugins,
    build: {
      rolldownOptions: {
        input: [entry]
      }
    }
  }

  return build(svelteConfig)
}

async function build(config: InlineConfig) {
  const mergedConfig = deepMerge(commonConfig, config)
  return viteBuild(mergedConfig)
}

// utils
function deepMerge<
  T extends Record<string, any>,
  U extends Record<string, any>
>(original: T = {} as T, toMerge: U = {} as U): T & U {
  const isObj = (x: any): x is Record<string, any> =>
    x && typeof x === "object" && !Array.isArray(x)

  const out: any = { ...original }

  for (const k in toMerge) {
    if (Object.prototype.hasOwnProperty.call(toMerge, k)) {
      const v = toMerge[k]
      const t = out[k]

      if (isObj(t) && isObj(v)) {
        out[k] = deepMerge(t, v)
      } else if (Array.isArray(t) && Array.isArray(v)) {
        out[k] = [...t, ...v]
      } else {
        out[k] = v
      }
    }
  }

  return out
}

function log(content: any, status: string = "build") {
  if (status === "") console.log(content)
  else console.log(`[${status}] ${content}`)
}

// Setting emptyOutDir at vite config empties folder at every build() run
async function emptyOutDirOnce() {
  const outDir = path.resolve(commonConfig.root!, commonConfig.build!.outDir!)

  try {
    await fs.mkdir(outDir, { recursive: true })
  } catch {}
  const items = await fs.readdir(outDir)

  for (const item of items) {
    const full = path.join(outDir, item)
    const s = await fs.stat(full)

    if (s.isDirectory()) {
      await fs.rm(full, { recursive: true, force: true })
    } else {
      await fs.rm(full, { force: true })
    }
  }
}

async function createExtensionZip() {
  const archive = archiver("zip", {
    zlib: {
      level: 9
    }
  })
  const fsOuput = fsSync.createWriteStream(
    `${manifest.name.toLowerCase().replaceAll(" ", "-")}-${
      manifest.version
    }.zip`
  )
  archive.pipe(fsOuput)
  archive.directory("dist", false)
  return archive.finalize()
}

// run build
async function run() {
  log("starting build...", PRODUCTION ? "PRODUCTION MODE" : "DEV MODE")

  // log("checking types..", "prebuild")
  // execSync("npx svelte-check && npx tsc --noEmit", { stdio: "inherit" })

  log("emptying out dir..", "pre-build")
  await emptyOutDirOnce()

  log("building typescript entries..")
  await Promise.all(tsEntries.map((tsEntry) => buildTSEntry(tsEntry)))

  log("building svelte entries..")
  await Promise.all(
    svelteEntries.map((svelteEntry) => buildSvelteEntry(svelteEntry))
  )

  if (PRODUCTION) {
    log("creating zip file..", "post-build")
    await createExtensionZip()
  }

  log("done!", "")
}

run()
