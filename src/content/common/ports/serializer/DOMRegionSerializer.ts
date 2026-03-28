import type { DOMRegion } from "@core/domain/entities/dom/DOMRegion"

export interface DOMRegionSerializer {
  serialize(domRegion: DOMRegion): any
}
