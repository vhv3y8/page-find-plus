import { getPhase, setPhase } from "../states/phase.svelte"

export function handleGlobalKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case "f":
    case "F": {
      // Ctrl+F to start
      if (e.ctrlKey) {
        e.preventDefault()
        if (getPhase() === "none") {
          setPhase("select")
        }
      }
      break
    }
    case "Escape": {
      // ESC to exit
      if (getPhase() !== "none") {
        setPhase("none")
      }
      break
    }
    default: {
      break
    }
  }
}
