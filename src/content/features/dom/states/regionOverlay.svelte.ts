// import { getSearchRegion } from "@core/adapters/ui/states/region.svelte"
import { isListening } from "@features/select/ui/states/listen.svelte"
import { createOverlay } from "../../../common/ui/overlay"
import { getSearchRegion } from "@core/adapters/dom/region.svelte"

let showRegionOverlay = $state(false)
let regionOverlayRafId: ReturnType<typeof requestAnimationFrame> | null = null

// create overlay and append to body
let { overlayElem, transitOverlay, hideOverlay } = createOverlay({
  backgroundColor: "transparent"
})
document.body.appendChild(overlayElem)

$effect.root(() => {
  $effect(() => {
    if (showRegionOverlay) {
      // show overlay for serach region with rAF recursively
      regionOverlayRafId = requestAnimationFrame(regionOverlayLoop)
    } else {
      cancelAnimationFrame(regionOverlayRafId!)
      regionOverlayRafId = null
      hideOverlay()
    }
  })

  // // hide overlay on re-listen
  // $effect(() => {
  //   if (isListening()) endShowingRegionOverlay()
  // })
})

function regionOverlayLoop() {
  if (!regionOverlayRafId) return

  const rect = getSearchRegion()!.getBoundingClientRect()
  transitOverlay(rect)

  regionOverlayRafId = requestAnimationFrame(regionOverlayLoop)
}

if (import.meta.env.MODE === "development") {
  $effect.root(() => {
    $effect(() => {
      console.log("[page find plus] [search region updated]", getSearchRegion())
    })
  })
}

// show region overlay functions
export function isShowingRegionOverlay() {
  return showRegionOverlay
}
export function startShowingRegionOverlay() {
  showRegionOverlay = true
}
export function endShowingRegionOverlay() {
  showRegionOverlay = false
}
