import type { DOMRegionStore } from "@core/application/ports/DOMRegionStore"
import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"

// input port
export type SelectDOMRegionUseCase = ReturnType<typeof createSelectDOMRegion>

// inject output port
export function createSelectDOMRegion(domRegionStore: DOMRegionStore) {
  return function selectDOMRegion(region: HTMLElement) {
    domRegionStore.setDOMRegion(region)

    // create
  }
}
