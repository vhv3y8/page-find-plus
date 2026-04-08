import { createExtensionZip, emptyOutDirOnce, log } from "../utils"
import { buildSvelteEntry, commonConfig } from "../config"

export const PRODUCTION = process.env.MODE === "production"

const tsEntries = ["sw.ts"]
const svelteEntries = ["content/content.ts", "options/options.html"]

// run build
async function run() {
  log("starting build...", PRODUCTION ? "PRODUCTION MODE" : "DEV MODE")

  // log("checking types..", "prebuild")
  // execSync("npx svelte-check && npx tsc --noEmit", { stdio: "inherit" })

  log("emptying out dir..", "pre-build")
  await emptyOutDirOnce(commonConfig)

  // log("building typescript entries..")
  // await Promise.all(tsEntries.map((tsEntry) => buildTSEntry(tsEntry)))

  // log("building svelte entries..")
  // await Promise.all(
  //   svelteEntries.map((svelteEntry) => buildSvelteEntry(svelteEntry))
  // )
  log("building content script entry..")
  await buildSvelteEntry("content/content.ts")

  if (PRODUCTION) {
    log("creating zip file..", "post-build")
    await createExtensionZip()
  }

  log("done!", "")
}

run()
