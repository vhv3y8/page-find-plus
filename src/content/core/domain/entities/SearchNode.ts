type SearchTreeNode = SearchNode | EmptyNode

// search node
export class SearchNode {}

// empty node
interface EmptyNode {
  readonly type: "EMPTY"
}

// create singleton
export const EMPTY_NODE: EmptyNode = Object.freeze({
  type: "EMPTY"
})
