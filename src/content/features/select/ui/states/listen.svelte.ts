let isListeningSelect = $state(false)
// target to set to search region
let regionTarget: HTMLElement | null = $state(null)

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

// current listening region functions
export function getRegionTarget() {
  return regionTarget
}
export function setRegionTarget(region: HTMLElement) {
  regionTarget = region
}
