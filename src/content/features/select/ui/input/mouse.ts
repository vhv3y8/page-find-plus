import { getPhase, setPhase } from "@app/phase.svelte"
import { searchRegionStore } from "@core/adapters/dom/impl/searchRegion.svelte"
import { endListeningSelect, isListening } from "../states/listen.svelte"
import { startShowingRegionOverlay } from "../states/regionOverlay.svelte"
import {
  regionTarget,
  startTargetOverlayLoopIfNotRunning,
  updateOverlayImmediateTarget,
  updateOverlayTarget
} from "../targetOverlay"
import { createSelectSearchRegion } from "@features/select/usecases/selectSearchRegion"
import { devLogger } from "@infra/DevLogger"

let mouseX = 0
let mouseY = 0
let mousemoveTimer: ReturnType<typeof setTimeout> | null = null

// mousemove
export function handleSelectMouseMove(e: MouseEvent) {
  if (getPhase() === "select") {
    devLogger.log("mousemove")

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
const selectSearchRegionUseCase = createSelectSearchRegion(searchRegionStore)
export function handleSelectMouseClick(e: MouseEvent) {
  if (isListening()) {
    devLogger.log("click")

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
      selectSearchRegionUseCase(regionTarget)

      // app state
      setPhase("search")
    }
  }
}
