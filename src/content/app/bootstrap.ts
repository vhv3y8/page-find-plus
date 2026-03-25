import {
  createHandleSelectMouseClick,
  handleSelectMouseMove
} from "@features/select/ui/input/mouse"
import { WebWorkerTreeRunner } from "../common/adapters/treerunner/webworker/impl/WebWorkerTreeRunner"
import type { TreeRunner } from "../common/ports/TreeRunner"
import type { DOMRegionStore } from "@core/application/ports/DOMRegionStore"
import { globalDOMRegionStore } from "@core/adapters/dom/region.svelte"
import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"
import type { SearchUseCase } from "@core/application/usecases/search"
import type { Command } from "@core/application/dto/Command"
import type { UpdateTreeNodeUseCase } from "@core/application/usecases/updateTreeNode"
import { createSelectDOMRegion } from "@features/select/usecases/selectDOMRegion"
import { handleGlobalKeydown } from "./input/keyboard"
import {
  createShowDOMRegionOverlay,
  showImmediateRegionOverlay,
  showTargetRegionOverlay
} from "@features/select/ui/input/state"

// 1. Infra / Adapter Impls

// infrastructure impls
// run tree related use cases at web worker
const treeUseCaseRunner: TreeRunner = WebWorkerTreeRunner
const runTreeUseCase = (command: Command) => treeUseCaseRunner.run(command)

// output port impls
const domRegionStore: DOMRegionStore = globalDOMRegionStore

// 2. Create Use Cases (DI)

// tree (core)
const initializeTree: InitializeTreeUseCase = runTreeUseCase
const search: SearchUseCase = runTreeUseCase
const updateTreeNode: UpdateTreeNodeUseCase = runTreeUseCase

// select
const selectDOMRegion = createSelectDOMRegion(domRegionStore)

// 3. Create Input Adapters (DI)

// select
const handleSelectMouseClick = createHandleSelectMouseClick(
  selectDOMRegion,
  initializeTree
)
const showDOMRegionOverlay = createShowDOMRegionOverlay(domRegionStore)

// 4. Register Input Adapters

export function registerInputAdapters() {
  // global
  document.addEventListener("keydown", handleGlobalKeydown)

  // core
  // observers?

  // select
  document.addEventListener("mousemove", handleSelectMouseMove)
  // to stop propagation to block click action when selecting region
  window.addEventListener("click", handleSelectMouseClick, true)
  $effect.root(() => {
    $effect(() => showImmediateRegionOverlay)
    $effect(() => showTargetRegionOverlay)
    $effect(() => showDOMRegionOverlay)
  })

  // search

  // result
}
