import { getPhase, setPhase } from "@core/adapters/ui/states/phase.svelte"
import {
  endListening,
  getRegionTarget,
  isListening,
  setRegionTarget
} from "../states/listen.svelte"
import { startShowingRegionOverlay } from "@core/adapters/ui/states/region.svelte"
import { colors, createOverlay } from "@core/adapters/ui/overlay"
import { setRegionToSearch } from "@features/select/usecases/setRegionToSearch"

let timer: ReturnType<typeof setTimeout> | null = null
let nextRafId: ReturnType<typeof requestAnimationFrame> | null = null

// for immediate overlay for reactivity
let immediateTarget: HTMLElement | null = null

let mouseX = 0
let mouseY = 0

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
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (immediateTarget) setRegionTarget(immediateTarget)
    }, 250)

    // start loop
    if (isListening() && !nextRafId) {
      nextRafId = requestAnimationFrame(updateOverlayLoop)
    }
  }
}

// loop function
function updateOverlayLoop() {
  // stop loop when listening has ended
  if (!isListening()) {
    cancelAnimationFrame(nextRafId!)
    nextRafId = null
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
        "[page search plus] [immediateTarget is null or html element]",
        immediateTarget
      )
    // hideTargetOverlay()
    hideImmediateOverlay()

    cancelAnimationFrame(nextRafId!)
    nextRafId = null
    return
  }

  // immediate target overlay
  if (immediateTarget) {
    const rect = (immediateTarget as HTMLElement).getBoundingClientRect()
    transitImmediateOverlay(rect)
  }

  // target overlay
  if (getRegionTarget()) {
    const rect = (getRegionTarget() as HTMLElement).getBoundingClientRect()
    transitTargetOverlay(rect)
  }

  // run recursively
  nextRafId = requestAnimationFrame(updateOverlayLoop)
}

// onclick
export function handleSelectMouseClick(e: MouseEvent) {
  if (isListening()) {
    // block clicking element
    e.preventDefault()
    e.stopImmediatePropagation()

    if (getRegionTarget()) {
      endListening()
      setRegionToSearch()
      setPhase("none")

      timer = null
      nextRafId = null

      // hide all listen overlays
      hideTargetOverlay()
      hideImmediateOverlay()
      // show core overlay
      startShowingRegionOverlay()
    }
  }
}
