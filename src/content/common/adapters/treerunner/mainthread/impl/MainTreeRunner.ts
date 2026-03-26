import type { TreeRunner } from "@common/ports/TreeRunner"
import type { Command } from "@core/application/dto/Command"
import { runTreeBootstrap } from "../../treeBootstrap"

// run tree bootstrap
const treeUseCaseRegistry = runTreeBootstrap()

export const MainTreeRunner: TreeRunner = {
  run(command: Command) {
    // run use case
    treeUseCaseRegistry[command.cmd](command)
  }
}
