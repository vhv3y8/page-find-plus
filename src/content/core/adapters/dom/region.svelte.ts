import type { DOMRegion } from "../../domain/entities/dom/DOMRegion"

// dom region to search
let searchRegion: DOMRegion = $state(null)

$effect.root(() => {
  $effect(() => {
    // send initialize tree command
    // ArrayBuffer 어쩌고로 먼저 10만개 처리해서 Transferable로 보내기 같은 구현 선택은 어디서?
  })
})

export function getSearchRegion() {
  return searchRegion
}
export function setSearchRegion(elem: HTMLElement) {
  searchRegion = elem
}
