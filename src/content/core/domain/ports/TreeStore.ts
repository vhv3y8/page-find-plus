import type { Tree } from "../entities/Tree"

export interface TreeStore {
  initializeTree(tree: Tree): boolean
  getTree(): Tree | null
}
