let isListeningSelect = $state(false)

// is listening select functions
export function isListening() {
  return isListeningSelect
}
export function startListening() {
  isListeningSelect = true
}
export function endListening() {
  isListeningSelect = false
}

// // current listening region functions
// export function getRegionTarget() {
//   return regionTarget
// }
// export function setRegionTarget(region: HTMLElement) {
//   regionTarget = region
// }
