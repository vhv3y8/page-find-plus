import type { Tree } from "../entities/Tree"
import type { SearchQuery } from "../entities/search/SearchQuery"
import { SearchResult } from "../entities/search/SearchResult"

export function textSearch(tree: Tree, query: SearchQuery): SearchResult {
  return new SearchResult()
}
