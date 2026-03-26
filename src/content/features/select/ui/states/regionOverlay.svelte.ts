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
