let timer: ReturnType<typeof setTimeout> | null = null
let lastTarget: HTMLElement | null = null

let mouseX = 0
let mouseY = 0

const overlay = document.createElement("div")
overlay.style.position = "fixed"
overlay.style.pointerEvents = "none"
overlay.style.padding = "4px"
overlay.style.borderRadius = "4px"
overlay.style.border = "2px solid #007bff"
overlay.style.backgroundColor = "rgba(0, 123, 255, 0.1)"
overlay.style.zIndex = "9999"
overlay.style.display = "none"
// overlay.style.transition = "all 0.05s ease-out"
document.body.appendChild(overlay)

// mousemove
export function handleSelectMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY

  requestAnimationFrame(updateOverlay)
}

function updateOverlay() {
  if (timer) clearTimeout(timer)

  timer = setTimeout(() => {
    const x = mouseX
    const y = mouseY

    const target = document.elementFromPoint(x, y) as HTMLElement | null

    if (
      !target ||
      target === document.body ||
      target === document.documentElement
    ) {
      overlay.style.display = "none"
      return
    }

    if (target !== lastTarget) {
      lastTarget = target

      const rect = target.getBoundingClientRect()

      overlay.style.display = "block"
      overlay.style.width = `${rect.width}px`
      overlay.style.height = `${rect.height}px`
      overlay.style.top = `${rect.top - 4 - 2}px`
      overlay.style.left = `${rect.left - 4 - 2}px`
    }

    // console.log("[target]", target, overlay)
  }, 100)

  requestAnimationFrame(updateOverlay)
}

// click
export function handleSelectMouseClick() {}
