// import { getSearchRegion } from "@core/adapters/dom/region.svelte"
import { createOverlay } from "@common/ui/factory/overlay"
import { isListening } from "./listen.svelte"

let showRegionOverlay = $state(false)

// show region overlay functions
export function isShowingRegionOverlay() {
  return showRegionOverlay
}
export function startShowingRegionOverlay() {
  showRegionOverlay = true
}
export function endShowingRegionOverlay() {
  showRegionOverlay = false
}
