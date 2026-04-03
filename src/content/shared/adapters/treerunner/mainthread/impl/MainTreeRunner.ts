import type { TreeRunner } from "src/content/shared/ports/TreeRunner"
import type { Command } from "@core/application/models/dto/TreeCommand"
import { runTreeBootstrap } from "../../treeBootstrap"

// run tree bootstrap
const treeUseCaseRegistry = runTreeBootstrap()

export const MainTreeRunner: TreeRunner = {
  run(command: Command) {
    // run use case
    treeUseCaseRegistry[command.cmd](command)
  }
}
