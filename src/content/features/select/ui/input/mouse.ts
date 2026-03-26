import { endListeningSelect, isListening } from "../states/listen.svelte"
import { createSelectDOMRegion } from "@features/select/usecases/selectDOMRegion"
import { getPhase, setPhase } from "@app/states/phase.svelte"
import { startShowingRegionOverlay } from "../states/regionOverlay.svelte"
import { globalDOMRegionStore } from "@core/adapters/dom/region.svelte"
import {
  regionTarget,
  startTargetOverlayLoopIfNotRunning,
  updateOverlayImmediateTarget,
  updateOverlayTarget
} from "../targetOverlay"

let mouseX = 0
let mouseY = 0
let mousemoveTimer: ReturnType<typeof setTimeout> | null = null

// mousemove
export function handleSelectMouseMove(e: MouseEvent) {
  if (getPhase() === "select") {
    if (import.meta.env.MODE === "development") {
      console.log("[page find plus] [select] [mousemove]")
    }

    // always update mouse position at select phase
    mouseX = e.clientX
    mouseY = e.clientY

    const target = document.elementFromPoint(
      mouseX,
      mouseY
    ) as HTMLElement | null
    if (!target) return

    // set immediate target
    updateOverlayImmediateTarget(target)
    // set target with debounce
    if (mousemoveTimer) clearTimeout(mousemoveTimer)
    mousemoveTimer = setTimeout(() => {
      if (target) updateOverlayTarget(target)
    }, 250)

    // start rAF loop
    if (isListening()) startTargetOverlayLoopIfNotRunning()
  }
}

// click
const selectDOMRegionUseCase = createSelectDOMRegion(globalDOMRegionStore)
export function handleSelectMouseClick(e: MouseEvent) {
  if (isListening()) {
    if (import.meta.env.MODE === "development") {
      console.log("[page find plus] [select] [click]")
    }

    // block clicking element
    e.preventDefault()
    e.stopImmediatePropagation()

    if (regionTarget) {
      // change state
      endListeningSelect()

      // cancel mouse move target update timer
      if (mousemoveTimer) clearTimeout(mousemoveTimer)
      mousemoveTimer = null

      // region overlay
      startShowingRegionOverlay()

      // update global region state
      selectDOMRegionUseCase(regionTarget)

      // app state
      setPhase("search")
    }
  }
}
