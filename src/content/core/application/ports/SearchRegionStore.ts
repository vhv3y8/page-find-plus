import type { Tree } from "@core/domain/entities/Tree"

export interface SearchRegionStore {
  regionToTree(): Tree
}
