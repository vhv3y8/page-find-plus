import type { Tree } from "@core/domain/entities/Tree"
import type { TreeStore } from "@core/domain/ports/TreeStore"

export let tree: Tree | null = null

export const globalTreeStore: TreeStore = {
  initializeTree(tree: Tree) {
    // make tree from data
    return true
  },
  getTree() {
    return tree
  }
}
