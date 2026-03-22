// @ts-nocheck

type MinimapItemConfig = {
  backgroundColor: string
  border: string
}

// minimap factory
export function createMinimap(): {
  region: HTMLElement
  // element 받고서 rect 저장해서 고정으로 사용함. 리사이즈 같은 거 일어날 때 element 자료구조에서 다시 그림.
  addFixedRectElement: (element: HTMLElement, config: MinimapItemConfig) => void
  addFollowElement: (element: HTMLElement, config: MinimapItemConfig) => void
} {}
