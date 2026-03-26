import type { DOMRegionStore } from "@core/application/ports/DOMRegionStore"

// inject output port with currying
export function createSelectDOMRegion(domRegionStore: DOMRegionStore) {
  return function selectDOMRegion(region: HTMLElement) {
    domRegionStore.setDOMRegion(region)
  }
}
