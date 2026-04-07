import type {
  SearchRegion,
  SearchRegionStore
} from "@core/adapters/dom/models/SearchRegion"

// inject output port with currying
export function createSelectSearchRegion(searchRegionStore: SearchRegionStore) {
  return function selectSearchRegion(region: SearchRegion) {
    searchRegionStore.setSearchRegion(region)
  }
}
