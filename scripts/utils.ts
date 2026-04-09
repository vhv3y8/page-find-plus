import path from "node:path"
import fs from "node:fs/promises"
import fsSync from "node:fs"
import { type InlineConfig } from "vite"
import archiver from "archiver"
import manifest from "../public/manifest.json"

export function deepMerge<
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

export function log(content: any, status: string = "build") {
  if (status === "") console.log(content)
  else console.log(`[${status}] ${content}`)
}

// Setting emptyOutDir at vite config empties folder at every build() run
export async function emptyOutDirOnce(commonConfig: InlineConfig) {
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

export async function createExtensionZip(dirpath: string = "dist") {
  const archive = archiver("zip", {
    zlib: {
      level: 9
    }
  })
  const fsOuput = fsSync.createWriteStream(
    `${manifest.name.toLowerCase().replaceAll(" ", "-")}-v${
      manifest.version
    }.zip`
  )
  archive.pipe(fsOuput)
  archive.directory(dirpath, false)
  return archive.finalize()
}
