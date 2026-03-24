// This file is entry point of web worker.
import type { Command } from "@core/application/usecases/dto/Command"
import { treeBootstrap, treeUseCaseRegistryMapper } from "../treeBootstrap"

// bootstrap
treeBootstrap()

// handle message
self.onmessage = async ({ data }: { data: { command: Command } }) => {
  self.postMessage(`[hi from worker!]`)

  const { command } = data
  const useCase = treeUseCaseRegistryMapper(command)
  const response = useCase(command)
  if (response) {
    self.postMessage({ response })
  }
}
