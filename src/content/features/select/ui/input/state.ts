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
import type {
  SearchRegion,
  SearchRegionStore
} from "@core/adapters/dom/models/SearchRegion"
import { devLogger } from "@infra/DevLogger"

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
  return function initializeTreeEffect() {
    // create tree with dom elemen? ArrayBuffer
    // const
    // initializeTreeUseCase()
  }
}

// dom region overlay
let regionOverlayRafId: ReturnType<typeof requestAnimationFrame> | null = null
// create overlay and append to body
let { overlayElem, transitOverlay, hideOverlay } = createOverlay({
  backgroundColor: "transparent"
})
document.body.appendChild(overlayElem)

export function createShowSearchRegionOverlayEffect(
  searchRegionStore: SearchRegionStore
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
    // if (import.meta.env.MODE === "development") {
    //   console.log(
    //     "[page find plus] [select] [SearchRegion change]",
    //     searchRegionStore.getSearchRegion()
    //   )
    // }
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
