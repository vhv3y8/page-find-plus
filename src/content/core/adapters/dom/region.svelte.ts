import type { DOMRegion } from "../../domain/entities/dom/DOMRegion"
import type { DOMRegionStore } from "../../application/ports/DOMRegionStore"
// import { initializeTree } from "@core/application/usecases/initializeTree"

// dom region to search
let searchRegion: DOMRegion | null = $state(null)

$effect.root(() => {
  $effect(() => {
    // send initialize tree command
    // ArrayBuffer 어쩌고로 먼저 10만개 처리해서 Transferable로 보내기 같은 구현 선택은 어디서?
    // initializeTree()
  })
})

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
