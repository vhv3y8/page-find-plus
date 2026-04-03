import type { DOMRegion } from "@core/adapters/dom/models/DOMRegion"

export type TreeCommand = InitializeCommand | UpdateNodeCommand | SearchCommand

// initialize
export type InitializeCommand = {
  cmd: "INITIALIZE"
  region: DOMRegion
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
