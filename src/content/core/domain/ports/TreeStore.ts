import type { Tree } from "../entities/tree/Tree"

export interface TreeStore {
  initializeTree(tree: Tree): boolean
  getTree(): Tree | null
}
