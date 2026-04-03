import type { Command } from "../../core/application/models/dto/TreeCommand"

// tree related use cases runner
// tree entity related data structures and calculations can be heavy. this makes us choose where to run all those codes.
export interface TreeRunner {
  run(command: Command): any
}
