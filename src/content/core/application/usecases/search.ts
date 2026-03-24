import type { TreeStore } from "@core/domain/ports/TreeStore"
import type { SearchCommand } from "./dto/Command"

// 검색 페이즈에서 유저 입력이 변할 때마다 실행
export function search(command: SearchCommand, treeStore: TreeStore) {
  const tree = treeStore.getTree()

  // get search result, make it to response and return
}
