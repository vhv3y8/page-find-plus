import { overlayColors } from "../colors"

// overlay factory
export function createOverlay({
  padding = 8,
  borderWidth = 2,
  borderRadius = 4,
  borderColor = overlayColors["skyblue"].borderColor,
  backgroundColor = overlayColors["skyblue"].backgroundColor,
  zIndex = 9999
}: Partial<{
  padding: number
  borderWidth: number
  borderRadius: number
  borderColor: string
  backgroundColor: string
  zIndex: number
}> = {}): {
  overlayElem: HTMLElement
  transitOverlay: (targetRect: DOMRect) => void
  hideOverlay: () => void
} {
  // create overlay
  const overlay = document.createElement("div")
  overlay.classList.add("chrome-extension::page-search-plus::overlay")

  overlay.style.display = "none"
  overlay.style.position = "fixed"
  overlay.style.pointerEvents = "none"
  // overlay.style.transition = "all 0.05s ease-out"

  overlay.style.padding = `${padding}px`
  overlay.style.boxSizing = `content-box`
  overlay.style.borderRadius = `${borderRadius}px`
  overlay.style.border = `${borderWidth}px dashed ${borderColor}`
  overlay.style.backgroundColor = backgroundColor || "inherit"
  overlay.style.zIndex = zIndex.toString()

  // move overlay to target rect
  const transitOverlay = (targetRect: DOMRect) => {
    overlay.style.display = "block"
    overlay.style.width = `${targetRect.width}px`
    overlay.style.height = `${targetRect.height}px`
    overlay.style.top = `${targetRect.top - borderWidth - padding}px`
    overlay.style.left = `${targetRect.left - borderWidth - padding}px`
  }

  // hide overlay when target is not valid
  const hideOverlay = () => {
    overlay.style.display = "none"
    overlay.style.width = `0px`
    overlay.style.height = `0px`
  }

  return { overlayElem: overlay, transitOverlay, hideOverlay }
}
