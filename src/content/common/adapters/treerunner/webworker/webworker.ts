// This file is entry point of web worker.
import type { Command } from "@core/application/dto/Command"

// run tree bootstrap
import { runTreeBootstrap } from "../treeBootstrap"
const treeUseCaseRegistry = runTreeBootstrap()

// handle message
self.onmessage = async ({ data }: { data: { command: Command } }) => {
  if (import.meta.env.MODE === "development")
    self.postMessage(`[hi from worker!]`)

  const { command } = data
  const useCase = treeUseCaseRegistry[command.cmd]

  // run use case
  useCase(command)
}

function deserializeDOMRegion() {}
