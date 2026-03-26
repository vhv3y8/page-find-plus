import type { Tree } from "@core/domain/entities/tree/Tree"
import type { TreeStore } from "@core/application/ports/TreeStore"

export let tree: Tree | null = null

export const globalTreeStore: TreeStore = {
  initializeTree(tree: Tree) {
    // (re)initialize tree
    return true
  },
  getTree() {
    return tree
  }
}
