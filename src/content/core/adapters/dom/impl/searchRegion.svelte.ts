import { devLogger } from "@infra/adapters/devlogger/main"
import {
  type DOMSearchRegion,
  type DOMSearchRegionStore
} from "../models/DOMSearchRegion"
import { Tree } from "@core/domain/entities/Tree"
import { TextNode } from "@core/domain/entities/Node"

// dom region to search
let searchRegion: DOMSearchRegion = $state(document.body)

export const searchRegionStore: DOMSearchRegionStore = {
  getSearchRegion() {
    return searchRegion
  },
  setSearchRegion(region: DOMSearchRegion) {
    searchRegion = region
    return true
  },

  regionToTree() {
    return convertSearchRegionToTree(searchRegion)
  }
}

// convert to dto
// @ts-ignore
function convertSearchRegionToTree(searchRegion: DOMSearchRegion): Tree {
  const tree = new Tree(new TextNode(searchRegion.textContent))
  devLogger.log("Converting Search Region To Tree", searchRegion, tree)
  return tree
}
