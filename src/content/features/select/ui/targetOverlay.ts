import { createOverlay } from "src/content/shared/ui/factories/overlay"
import { isListening } from "./states/listen.svelte"
import { overlayColors } from "src/content/shared/ui/colors"
import { devLogger } from "../../../infra/impls/devlogger/main"

// create target overlay and append
let {
  overlayElem: targetOverlayElem,
  transitOverlay: transitTargetOverlay,
  hideOverlay: hideTargetOverlay
} = createOverlay()
// document.addEventListener("DOMContentLoaded", () => {
// })
// document
//   .getElementById("chrome-extension::page-find-plus::overlay-container")!
document.body.appendChild(targetOverlayElem)
export { hideTargetOverlay }

// create target immediate overlay and append
let {
  overlayElem: immediateOverlayElem,
  transitOverlay: transitImmediateOverlay,
  hideOverlay: hideImmediateOverlay
} = createOverlay({
  zIndex: 9998,
  borderWidth: 0,
  borderRadius: 0,
  padding: 2,
  borderColor: overlayColors["immediateGray"].borderColor,
  backgroundColor: overlayColors["immediateGray"].backgroundColor
})
// document.addEventListener("DOMContentLoaded", () => {
// })
// document
//   .getElementById("chrome-extension::page-find-plus::overlay-container")!
document.body.appendChild(immediateOverlayElem)

// target to set to search region
export let regionTarget: HTMLElement | null = null
// for immediate overlay for reactivity
let immediateTarget: HTMLElement | null = null

let nextRafId: ReturnType<typeof requestAnimationFrame> | null = null

// start / end loop loop
export function startTargetOverlayLoopIfNotRunning() {
  if (!nextRafId) {
    nextRafId = requestAnimationFrame(updateOverlayLoop)
  }
}

function endTargetOverlayLoop() {
  // cancel animation frame
  cancelAnimationFrame(nextRafId!)
  nextRafId = null
  // set targets to null
  regionTarget = null
  immediateTarget = null
  // hide overlays
  hideImmediateOverlay()
  hideTargetOverlay()
}

// update targets
export function updateOverlayImmediateTarget(targetElem: HTMLElement) {
  immediateTarget = targetElem
}

export function updateOverlayTarget(targetElem: HTMLElement) {
  regionTarget = targetElem
}

// loop function
function updateOverlayLoop() {
  // stop loop based on listen state
  if (!isListening()) {
    endTargetOverlayLoop()
    return
  }

  // stop and hide overlays when immediate target is invalid
  // TODO: filter when immediate target is extension element (inside shadow dom) -> make it unhoverable at listen?
  if (
    immediateTarget === null ||
    immediateTarget === document.documentElement
  ) {
    devLogger.log("immediateTarget is null or html element", immediateTarget)

    hideTargetOverlay()
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
  if (regionTarget) {
    const rect = (regionTarget as HTMLElement).getBoundingClientRect()
    transitTargetOverlay(rect)
  }

  // run recursively
  nextRafId = requestAnimationFrame(updateOverlayLoop)
}
