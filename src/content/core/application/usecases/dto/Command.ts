export type Command = InitializeCommand | UpdateNodeCommand | SearchCommand

// initialize
export type InitializeCommand = {
  cmd: "INITIALIZE"
  treeData: ArrayBuffer
}

// update
export type UpdateNodeCommand = {
  cmd: "UPDATE_NODE"
  type: "create" | "delete"
}

// search
export type SearchCommand = TextSearchCommand

export type TextSearchCommand = {
  cmd: "SEARCH"
  type: "text"
  query: string
}
