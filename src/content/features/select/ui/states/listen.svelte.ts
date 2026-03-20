export let isListeningSelect = $state(false)
export let currentListeningRegion: HTMLElement | null = $state(null)

export function startListening() {
  isListeningSelect = true
}
export function endListening() {
  isListeningSelect = false
}

export function setCurrentListeningRegion(region: HTMLElement) {
  currentListeningRegion = region
}
