import { endListening, isListening } from "../states/listen.svelte"
import { colors, createOverlay } from "../../../../common/ui/factory/overlay"
import { type SelectDOMRegionUseCase } from "@features/select/usecases/selectDOMRegion"
import { getPhase, setPhase } from "@app/states/phase.svelte"
import { startShowingRegionOverlay } from "../states/domRegionOverlay.svelte"
import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"

let mouseX = 0
let mouseY = 0

// target to set to search region
let regionTarget: HTMLElement | null = $state(null)
// for immediate overlay for reactivity
let immediateTarget: HTMLElement | null = null

let mousemoveTimer: ReturnType<typeof setTimeout> | null = null
let nextMousemoveRafId: ReturnType<typeof requestAnimationFrame> | null = null

// create target overlay and append
let {
  overlayElem: targetOverlayElem,
  transitOverlay: transitTargetOverlay,
  hideOverlay: hideTargetOverlay
} = createOverlay()
document.body.appendChild(targetOverlayElem)

// create target immediate overlay and append
let {
  overlayElem: immediateOverlayElem,
  transitOverlay: transitImmediateOverlay,
  hideOverlay: hideImmediateOverlay
} = createOverlay({
  zIndex: 9998,
  borderWidth: 0,
  borderRadius: 0,
  padding: 0,
  borderColor: colors["immediateGray"].borderColor,
  backgroundColor: colors["immediateGray"].backgroundColor
})
document.body.appendChild(immediateOverlayElem)

// onmousemove
export function handleSelectMouseMove(e: MouseEvent) {
  if (getPhase() === "select") {
    // always update mouse position at select phase
    mouseX = e.clientX
    mouseY = e.clientY

    // set immediateTarget
    immediateTarget = document.elementFromPoint(
      mouseX,
      mouseY
    ) as HTMLElement | null

    // set target with debounce
    if (mousemoveTimer) clearTimeout(mousemoveTimer)
    mousemoveTimer = setTimeout(() => {
      if (immediateTarget) regionTarget = immediateTarget
    }, 250)

    // start loop
    if (isListening() && !nextMousemoveRafId) {
      nextMousemoveRafId = requestAnimationFrame(updateOverlayLoop)
    }
  }
}

// loop function
function updateOverlayLoop() {
  // stop loop when listening has ended
  if (!isListening()) {
    cancelAnimationFrame(nextMousemoveRafId!)
    nextMousemoveRafId = null
    return
  }

  // stop and hide overlays when immediate target is invalid
  // TODO: filter when immediate target is extension element (inside shadow dom) -> make it unhoverable at listen?
  if (
    immediateTarget === null ||
    immediateTarget === document.documentElement
  ) {
    if (import.meta.env.MODE === "development")
      console.log(
        "[page find plus] [immediateTarget is null or html element]",
        immediateTarget
      )
    // hideTargetOverlay()
    hideImmediateOverlay()

    cancelAnimationFrame(nextMousemoveRafId!)
    nextMousemoveRafId = null
    return
  }

  // immediate target overlay
  if (immediateTarget) {
    const rect = (immediateTarget as HTMLElement).getBoundingClientRect()
    transitImmediateOverlay(rect)
  }

  // target overlay
  if (regionTarget) {
    const rect = (regionTarget as HTMLElement).getBoundingClientRect()
    transitTargetOverlay(rect)
  }

  // run recursively
  nextMousemoveRafId = requestAnimationFrame(updateOverlayLoop)
}

// onclick
export function createHandleSelectMouseClick(
  selectDOMRegionUseCase: SelectDOMRegionUseCase,
  initializeTreeUseCase: InitializeTreeUseCase
) {
  return function handleSelectMouseClick(e: MouseEvent) {
    if (isListening()) {
      // block clicking element
      e.preventDefault()
      e.stopImmediatePropagation()

      if (regionTarget) {
        // update ui
        endListening()
        setPhase("search")

        mousemoveTimer = null
        nextMousemoveRafId = null
        hideTargetOverlay()
        hideImmediateOverlay()
        startShowingRegionOverlay()

        // update global region state
        selectDOMRegionUseCase(regionTarget)
      }
    }
  }
}
