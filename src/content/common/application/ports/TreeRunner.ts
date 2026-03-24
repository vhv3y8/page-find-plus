import type { Command } from "../usecases/dto/Command"

// Tree entity related data structures and calculations can be heavy. this makes us choose where to run all those codes.
export interface TreeRunner {
  run(command: Command): void
}
