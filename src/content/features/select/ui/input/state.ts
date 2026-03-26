import { createOverlay } from "@common/ui/factory/overlay"
import type { DOMRegionStore } from "@core/application/ports/DOMRegionStore"
import { isShowingRegionOverlay } from "../states/regionOverlay.svelte"
import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"
import { getPhase } from "@app/states/phase.svelte"
import { isListening, startListeningSelect } from "../states/listen.svelte"

// listening state
export function startListeningAtSelectPhaseEffect() {
  if (import.meta.env.MODE === "development") {
    console.log("[page find plus] [select] [phase change]", getPhase())
  }

  if (getPhase() === "select") {
    if (!isListening()) startListeningSelect()
  }
  // this probably doesn't happen
  // else {
  //     if (isListening()) endListeningSelect()
  // }
}

// initialize tree on dom region change
export function createInitializeTreeEffect(
  domRegionStore: DOMRegionStore,
  initializeTreeUseCase: InitializeTreeUseCase
) {
  return function initializeTreeEffect() {
    // dom 받아서 트리 생성? ArrayBuffer
    // initializeTreeUseCase()
  }
}

// dom region overlay
export function createShowDOMRegionOverlayEffect(
  domRegionStore: DOMRegionStore
) {
  let regionOverlayRafId: ReturnType<typeof requestAnimationFrame> | null = null
  // create overlay and append to body
  let { overlayElem, transitOverlay, hideOverlay } = createOverlay({
    backgroundColor: "transparent"
  })
  document.body.appendChild(overlayElem)

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
      console.log("[page find plus] [select] [DOMRegion change]")
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
