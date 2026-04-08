import { createServer } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

async function startServer() {
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    server: {
      port: 5174,
      open: "/scripts/content.html"
    },
    plugins: [svelte()]
  })

  await server.listen()
  server.printUrls()
}

startServer()
