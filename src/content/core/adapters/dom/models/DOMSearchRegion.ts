import type { SearchRegionStore } from "@core/application/ports/SearchRegionStore"

export type DOMSearchRegion = HTMLElement

export interface DOMSearchRegionStore extends SearchRegionStore {
  getSearchRegion(): DOMSearchRegion
  setSearchRegion(region: DOMSearchRegion): boolean

  // regionToTree(): Tree
  [extra: string]: any
}
