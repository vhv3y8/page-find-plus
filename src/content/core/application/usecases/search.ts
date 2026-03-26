import type { TreeStore } from "../ports/TreeStore"
import type { SearchCommand } from "../dto/Command"
import type { SearchResult } from "@core/domain/entities/search/SearchResult"

// input port for input adapters to inject
export type SearchUseCase = ReturnType<typeof createSearchUseCase>

// inject output port with currying
export function createSearchUseCase(treeStore: TreeStore) {
  // 검색 페이즈에서 유저 입력이 변할 때마다 실행
  return function search(command: SearchCommand): SearchResult {
    const tree = treeStore.getTree()

    // search with domain service

    // get search result, make it to response and return
    return {}
  }
}
