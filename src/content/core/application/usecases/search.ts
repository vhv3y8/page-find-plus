import type { TreeStore } from "../ports/TreeStore"
import type { SearchResult } from "@core/domain/vo/search/SearchResult"
import type { SearchQuery } from "@core/domain/vo/search/SearchQuery"

// input port for input adapters to inject
export type SearchUseCase = ReturnType<typeof createSearchUseCase>

// inject output port with currying
export function createSearchUseCase(treeStore: TreeStore) {
  // run at user change update at search phase
  return function search(searchQuery: SearchQuery): SearchResult {
    const tree = treeStore.getTree()

    // search with domain service

    // get search result, make it to response and return?
    return {}
  }
}
