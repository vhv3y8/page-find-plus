import { createOverlay } from "@common/ui/factory/overlay"
import type { DOMRegionStore } from "@core/application/ports/DOMRegionStore"
import {
  endShowingRegionOverlay,
  isShowingRegionOverlay
} from "../states/regionOverlay.svelte"
import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"
import { getPhase } from "@app/states/phase.svelte"
import { isListening, startListeningSelect } from "../states/listen.svelte"
import { hideTargetOverlay } from "../targetOverlay"

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
  domRegionStore: DOMRegionStore,
  initializeTreeUseCase: InitializeTreeUseCase
) {
  return function initializeTreeEffect() {
    // create tree with dom elemen? ArrayBuffer
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

export function createShowDOMRegionOverlayEffect(
  domRegionStore: DOMRegionStore
) {
  // loop function
  function regionOverlayLoop() {
    if (!regionOverlayRafId) return

    // calculate and update
    const rect = domRegionStore.getDOMRegion().getBoundingClientRect()
    transitOverlay(rect)

    regionOverlayRafId = requestAnimationFrame(regionOverlayLoop)
  }

  // effect adapter
  return function showDOMRegionOverlayEffect() {
    if (import.meta.env.MODE === "development") {
      console.log(
        "[page find plus] [select] [DOMRegion change]",
        domRegionStore.getDOMRegion()
      )
    }

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
