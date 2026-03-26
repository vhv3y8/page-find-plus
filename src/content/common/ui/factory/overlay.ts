export const colors = {
  blueish: {
    borderColor: "#007bff",
    backgroundColor: "rgba(0, 123, 255, 0.1)"
  },
  green: {
    borderColor: "#27AE60",
    backgroundColor: "rgba(39, 174, 96, 0.15)"
  },
  orange: {
    borderColor: "#E67E22",
    backgroundColor: "rgba(230, 126, 34, 0.15)"
  },

  //
  skyblue: {
    borderColor: "#5DA5DA",
    backgroundColor: "rgba(93, 165, 218, 0.12)"
  },
  dustypurple: {
    borderColor: "#A29BFE",
    backgroundColor: "rgba(162, 155, 254, 0.12)"
  },

  // immediate overlay colors
  immediateGray: {
    borderColor: "rgba(128, 128, 128, 0.3)",
    backgroundColor: "rgba(128, 128, 128, 0.1)"
  }
} satisfies Record<string, { borderColor?: string; backgroundColor?: string }>

// overlay factory
export function createOverlay({
  padding = 8,
  borderWidth = 2,
  borderRadius = 4,
  borderColor = colors["skyblue"].borderColor,
  backgroundColor = colors["skyblue"].backgroundColor,
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
