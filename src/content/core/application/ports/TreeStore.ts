import type { Tree } from "../../domain/entities/Tree"

export interface TreeStore {
  setTree(tree: Tree): boolean
  getTree(): Tree | null
}
