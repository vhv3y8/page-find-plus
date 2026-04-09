import type {
  DOMSearchRegion,
  DOMSearchRegionStore
} from "@core/adapters/dom/models/DOMSearchRegion"
import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"
import type { DevLogger } from "@infra/ports/DevLogger"

export type SelectSearchRegionUseCase = ReturnType<
  typeof createSelectSearchRegion
>

// inject output port with currying
export function createSelectSearchRegion(
  searchRegionStore: DOMSearchRegionStore,
  initializeTreeUseCase: InitializeTreeUseCase,
  devLogger?: DevLogger
) {
  return function selectSearchRegion(region: DOMSearchRegion) {
    searchRegionStore.setSearchRegion(region)
    devLogger?.log("Starting Initialize Tree Use Case", region)
    const regionTree = searchRegionStore.regionToTree()
    initializeTreeUseCase(regionTree)
  }
}
