import type { Tree } from "../../domain/entities/tree/Tree"

export interface TreeStore {
  initializeTree(tree: Tree): boolean
  getTree(): Tree | null
}
