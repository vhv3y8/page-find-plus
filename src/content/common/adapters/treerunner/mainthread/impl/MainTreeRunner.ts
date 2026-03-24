import type { TreeRunner } from "@core/application/ports/TreeRunner"
import type { Command } from "@core/application/usecases/dto/Command"

export const MainTreeRunner: TreeRunner = {
  run(command: Command) {}
}
