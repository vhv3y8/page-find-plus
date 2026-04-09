// @ts-nocheck
type MinimapItemConfig = {
  backgroundColor: string
  border: string
}

// minimap factory
export function createMinimap(): {
  region: HTMLElement
  // get element and use it as fixed rect. redraw with element at changes like resize.
  addFixedRectElement: (element: HTMLElement, config: MinimapItemConfig) => void
  addFollowElement: (element: HTMLElement, config: MinimapItemConfig) => void
  // update
} {}
