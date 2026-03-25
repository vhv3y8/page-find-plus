import { createOverlay } from "@common/ui/factory/overlay"
import type { DOMRegionStore } from "@core/application/ports/DOMRegionStore"
import { isShowingRegionOverlay } from "../states/domRegionOverlay.svelte"

export function showImmediateRegionOverlay() {}

export function showTargetRegionOverlay() {}

export function createShowDOMRegionOverlay(domRegionStore: DOMRegionStore) {
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

  // adapter
  return function showDOMRegionOverlay() {
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
