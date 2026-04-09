import { getPhase } from "@app/phase.svelte"
import { createOverlay } from "src/content/shared/ui/factories/overlay"
import {
  endShowingRegionOverlay,
  isShowingRegionOverlay
} from "../states/regionOverlay.svelte"
import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"
import { isListening, startListeningSelect } from "../states/listen.svelte"
import { hideTargetOverlay } from "../targetOverlay"
import type { TransportNameResolver } from "@infra/adapters/TransportNameResolver"
import { devLogger } from "@infra/adapters/devlogger/main"
import type { SearchRegionStore } from "@core/application/ports/SearchRegionStore"
import type { DOMSearchRegionStore } from "@core/adapters/dom/models/DOMSearchRegion"

// listening state
export function startListeningAtSelectPhaseEffect() {
  if (getPhase() === "select") {
    if (!isListening()) startListeningSelect()
  }
  // this probably doesn't happen
  // else {
  //     if (isListening()) endListeningSelect()
  // }
}

export function hideRegionOverlayAtListeningEffect() {
  if (isListening()) {
    endShowingRegionOverlay()
    hideTargetOverlay()

    if (regionOverlayRafId) {
      cancelAnimationFrame(regionOverlayRafId)
      regionOverlayRafId = null
    }
  }
}

// initialize tree on dom region change
export function createInitializeTreeEffect(
  searchRegionStore: SearchRegionStore,
  initializeTreeUseCase: InitializeTreeUseCase,
  transportNameResolver?: TransportNameResolver
) {
  if (transportNameResolver !== undefined) {
    return function initializeTreeEffect() {
      // create tree with dom elemen? ArrayBuffer
      // const
      // initializeTreeUseCase()
    }
  }
  return function initializeTreeEffect() {
    // create tree with dom elemen? ArrayBuffer
    // const
    // initializeTreeUseCase()
    // searchRegionStore.setSearchRegion(get)
    devLogger.log("Starting Initialize Tree Use Case")
    initializeTreeUseCase(searchRegionStore.regionToTree())
  }
}

// dom region overlay
let regionOverlayRafId: ReturnType<typeof requestAnimationFrame> | null = null
// create overlay and append to body
let { overlayElem, transitOverlay, hideOverlay } = createOverlay({
  backgroundColor: "transparent"
})
// document.addEventListener("DOMContentLoaded", () => {
// })
// document
//   .getElementById("chrome-extension::page-find-plus::overlay-container")!
document.body.appendChild(overlayElem)

export function createShowSearchRegionOverlayEffect(
  searchRegionStore: DOMSearchRegionStore
) {
  // loop function
  function regionOverlayLoop() {
    if (!regionOverlayRafId) return

    // calculate and update
    const rect = searchRegionStore.getSearchRegion().getBoundingClientRect()
    transitOverlay(rect)

    regionOverlayRafId = requestAnimationFrame(regionOverlayLoop)
  }

  // effect adapter
  return function showSearchRegionOverlayEffect() {
    devLogger.log("SearchRegion Update", searchRegionStore.getSearchRegion())

    if (isShowingRegionOverlay()) {
      // show overlay for search region with rAF
      regionOverlayRafId = requestAnimationFrame(regionOverlayLoop)
    } else {
      cancelAnimationFrame(regionOverlayRafId!)
      regionOverlayRafId = null
      hideOverlay()
    }
  }
}
