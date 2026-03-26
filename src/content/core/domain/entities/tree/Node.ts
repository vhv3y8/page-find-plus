export type Node = TreeNode | EmptyNode

// empty node
type EmptyNode = {
  readonly type: "EMPTY"
  children: Node[]
}
// create singleton
export const EMPTY_LEAF_NODE: EmptyNode = Object.freeze({
  type: "EMPTY",
  children: []
})

// search node
export type TreeNode = ElementNode | TextNode

export class ElementNode {
  readonly type = "ELEMENT"

  constructor(public children: Node[]) {}
}

export class TextNode {
  readonly type = "TEXT"

  constructor(public text: string) {}
}
