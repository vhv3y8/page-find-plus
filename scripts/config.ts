import { build as viteBuild, type InlineConfig } from "vite"
import { CustomWorkerPlugin, LogIdPlugin } from "./plugins"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import tailwindcss from "@tailwindcss/vite"
import { deepMerge } from "./utils"

const PRODUCTION = process.env.MODE === "production"

export const commonConfig: InlineConfig = {
  mode: process.env.MODE || "production",
  root: "src",
  publicDir: "../public",
  resolve: {
    alias: {
      "@lib": "/lib",
      "@app": "/content/app",
      "@core": "/content/core",
      "@features": "/content/features",
      "@shared": "/content/shared",
      "@infra": "/content/infra"
    }
  },
  // worker: {
  //   format: "iife",
  //   rolldownOptions: {
  //     output: {
  //       codeSplitting: false
  //     }
  //   },
  //   plugins: () => []
  // },
  plugins: [LogIdPlugin(), CustomWorkerPlugin()],
  build: {
    outDir: "../dist",
    rolldownOptions: {
      output: {
        assetFileNames: "[name].css",
        entryFileNames: "[name].js"
      }
    },
    sourcemap: PRODUCTION ? false : "inline"
  }
  // logLevel: "error"
}

export function workerEntryConfig(entry: string): InlineConfig {
  const workerConfig: InlineConfig = {
    root: commonConfig.root,
    optimizeDeps: {
      noDiscovery: true
    },
    build: {
      lib: {
        entry,
        name: "workerInstance",
        formats: ["iife"]
      },
      write: false,
      minify: true,
      outDir: "dist-worker", // 메인 빌드와 겹치지 않게
      emptyOutDir: false
    },
    configFile: false,
    cacheDir: "node_modules/.vite-worker",
    plugins: [LogIdPlugin()]
  }
  console.log("[workerConfig]", workerConfig)
  return workerConfig
}

export async function buildTSEntry(entry: string) {
  const tsConfig: InlineConfig = {
    build: {
      rolldownOptions: {
        input: [entry]
      }
    }
  }

  return build(tsConfig)
}

export async function buildSvelteEntry(entry: string) {
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

export async function build(config: InlineConfig) {
  const mergedConfig = deepMerge(commonConfig, config)
  return viteBuild(mergedConfig)
}
