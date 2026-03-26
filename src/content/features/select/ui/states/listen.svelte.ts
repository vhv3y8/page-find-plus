let isListeningSelect = $state(false)

// is listening select functions
export function isListening() {
  return isListeningSelect
}
export function startListeningSelect() {
  isListeningSelect = true
}
export function endListeningSelect() {
  isListeningSelect = false
}

// // current listening region functions
// export function getRegionTarget() {
//   return regionTarget
// }
// export function setRegionTarget(region: HTMLElement) {
//   regionTarget = region
// }
