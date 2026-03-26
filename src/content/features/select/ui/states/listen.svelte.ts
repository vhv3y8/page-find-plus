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
