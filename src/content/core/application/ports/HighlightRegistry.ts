import type { NodeIndex } from "@core/domain/vo/NodeIndex"
import type { TreeRange, TreeRangeDiff } from "@core/domain/vo/TreeRange"

export interface HighlightRegistry {
  // appendHighlight(): boolean
  resetAllHighlights(highlights: TreeRange[]): void
  updateHighlight(index: NodeIndex, update: TreeRangeDiff): void

  focusFirst(): void
  focusNext(): void
  focusPrevious(): void
}
