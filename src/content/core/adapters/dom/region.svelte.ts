import type { DOMRegion } from "../../domain/entities/dom/DOMRegion"
import type { DOMRegionStore } from "../../domain/ports/DOMRegionStore"

// dom region to search
let searchRegion: DOMRegion | null = $state(null)

export const globalDOMRegionStore: DOMRegionStore = {
  getDOMRegion() {
    if (!searchRegion) {
      searchRegion = document.body
    }
    return searchRegion
  },
  setDOMRegion(region: DOMRegion) {
    searchRegion = region
    return true
  }
}
