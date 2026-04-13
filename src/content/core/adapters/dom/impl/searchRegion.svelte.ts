import { devLogger } from "../../../../infra/impls/devlogger/main"
import {
  type DOMSearchRegion,
  type DOMSearchRegionStore
} from "../models/DOMSearchRegion"
import { Tree } from "@core/domain/entities/Tree"
import { TextNode } from "@core/domain/entities/Node"

// dom region to search
let searchRegion: DOMSearchRegion | null = $state(null)

export const searchRegionStore: DOMSearchRegionStore = {
  getSearchRegion() {
    if (!searchRegion) {
      devLogger.log(
        "getSearchRegion",
        "Search Region is null. Setting it to document.body"
      )
      searchRegion = document.body
    }
    return searchRegion
  },
  setSearchRegion(region: DOMSearchRegion) {
    searchRegion = region
    devLogger.log(
      "setSearchRegion",
      region,
      "Node Count",
      countAllNodes(region)
    )
    return true
  },

  regionToTree() {
    return convertSearchRegionToTree(searchRegion!)
  }
}

// for test
function countAllNodes(rootElement: HTMLElement) {
  const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_ELEMENT)
  let count = 0
  while (walker.nextNode()) {
    count++
  }
  return count
}

// convert to dto
// @ts-ignore
function convertSearchRegionToTree(searchRegion: DOMSearchRegion): Tree {
  const tree = new Tree(new TextNode(searchRegion.textContent))
  devLogger.log("Converting Search Region To Tree", searchRegion, tree)
  return tree
}
