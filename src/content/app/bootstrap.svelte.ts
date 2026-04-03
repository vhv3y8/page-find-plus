import {
  handleSelectMouseClick,
  handleSelectMouseMove
} from "@features/select/ui/input/mouse"
import { WebWorkerTreeRunner } from "../shared/adapters/treerunner/webworker/impl/WebWorkerTreeRunner"
import type { TreeRunner } from "../shared/ports/TreeRunner"
import type { DOMRegionStore } from "@core/application/ports/SearchRegionStore"
import { globalDOMRegionStore } from "@core/adapters/dom/region.svelte"
import type { InitializeTreeUseCase } from "@core/application/usecases/initializeTree"
import type { SearchUseCase } from "@core/application/usecases/search"
import type { Command } from "../core/application/models/dto/TreeCommand"
import type { UpdateTreeNodeUseCase } from "@core/application/usecases/updateTreeNode"
import { handleGlobalKeydown } from "./input/keyboard"
import {
  createInitializeTreeEffect,
  createShowDOMRegionOverlayEffect,
  hideRegionOverlayAtListeningEffect,
  startListeningAtSelectPhaseEffect
} from "@features/select/ui/input/state"
// infra
import {
  createTreeFacade,
  type TreeFacade
} from "@infra/entries/tree/TreeFacade"
import {
  createTransportResolver,
  type TransportRecord,
  type TransportResolver
} from "@infra/adapters/TransportResolver"
import type { Transport } from "@infra/ports/Transport"
import type { Serializer } from "@infra/ports/Serializer"
import { createTransferableSerializer } from "@infra/adapters/webworker/TransferableSerializer"
import { createWebWorkerTransport } from "@infra/adapters/webworker/WebWorkerTransport"

import TreeWebWorker from "@infra/entries/tree/treeWebWorker?worker&inline"

if (import.meta.env.MODE === "development") {
  console.log("[page find plus] [bootstrap]")
}

// 1. Infra / Adapter Impls

// common
const transferableSerializer: Serializer = createTransferableSerializer()

// tree
const treeWebWorkerTransport: Transport = createWebWorkerTransport(
  new TreeWebWorker(),
  transferableSerializer
)
const treeTransportRecord: TransportRecord = {
  webworker: treeWebWorkerTransport
}
const treeTransportResolver: TransportResolver =
  createTransportResolver(treeTransportRecord)

// infrastructure impls
// run tree related use cases at web worker
// const treeUseCaseRunner: TreeRunner = WebWorkerTreeRunner
// const runTreeUseCase = (command: Command) => treeUseCaseRunner.run(command)

// output port impls
const domRegionStore: DOMRegionStore = globalDOMRegionStore

// 2. Create Use Cases (DI)

// tree (core)
// const initializeTree: InitializeTreeUseCase = runTreeUseCase
// const search: SearchUseCase = runTreeUseCase
// const updateTreeNode: UpdateTreeNodeUseCase = runTreeUseCase
const treeFacade: TreeFacade = createTreeFacade(treeTransportResolver)

// select
// const selectDOMRegion = createSelectDOMRegion(domRegionStore)

// 3. Create Input Adapters (DI)

// select
// const handleSelectMouseClick = createHandleSelectMouseClick(initializeTree)
const showDOMRegionOverlayEffect =
  createShowDOMRegionOverlayEffect(domRegionStore)
const initializeTreeEffect = createInitializeTreeEffect(
  domRegionStore,
  treeFacade.initializeTree
)

// 4. Register Input Adapters

// global
document.addEventListener("keydown", handleGlobalKeydown)

// core
// observers?

// select
document.addEventListener("mousemove", handleSelectMouseMove)
// to stop propagation to block click action when selecting region
window.addEventListener("click", handleSelectMouseClick, true)
$effect.root(() => {
  $effect(startListeningAtSelectPhaseEffect)
  $effect(hideRegionOverlayAtListeningEffect)
  $effect(showDOMRegionOverlayEffect)
  $effect(initializeTreeEffect)
})

// search

// result
