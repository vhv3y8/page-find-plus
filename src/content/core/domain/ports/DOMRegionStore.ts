import type { DOMRegion } from "@core/domain/entities/dom/DOMRegion"

export interface DOMRegionStore {
  getDOMRegion(): DOMRegion
  setDOMRegion(region: DOMRegion): boolean
}
