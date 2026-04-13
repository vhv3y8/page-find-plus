// core
import type { SearchRegionStore } from "@core/application/ports/SearchRegionStore"
import type { DOMSearchRegionStore } from "@core/adapters/dom/models/DOMSearchRegion"
import { searchRegionStore } from "@core/adapters/dom/impl/searchRegion.svelte"
// features
import {
  createHandleSelectMouseClick,
  handleSelectMouseMove
} from "@features/select/ui/input/mouse"
import {
  createInitializeTreeEffect,
  createShowSearchRegionOverlayEffect,
  hideRegionOverlayAtListeningEffect,
  startListeningAtSelectPhaseEffect
} from "@features/select/ui/input/state"
// infra
import {
  // createDynamicTransportTreeFacade,
  // createTreeImplFacade,
  createWebWorkerTreeFacade
} from "@infra/entries/tree/TreeFacade"
import { devLogger } from "../infra/impls/devlogger/main"
import { handleGlobalKeydown } from "./keyboard"
import { createSelectSearchRegion } from "@features/select/usecases/selectSearchRegion"
import { ProtobufSerializer } from "@infra/impls/protobuf/ProtobufSerializer"

devLogger.log("Bootstrap Entry Started")

const forTest = new ProtobufSerializer()

// 1. Infra / Adapter Impls
// const { treeFacade, transportNameResolver } = createDynamicTransportTreeFacade()
// const treeFacade = createTreeImplFacade()
const treeFacade = createWebWorkerTreeFacade(devLogger)

// output port impls
const searchRegionStoreImpl: DOMSearchRegionStore = searchRegionStore

// 2. Create Use Cases (DI)

// tree (core)
const initializeTree = treeFacade.initializeTree
const search = treeFacade.search
const updateTreeNode = treeFacade.updateTreeNode

// select
const selectSearchRegion = createSelectSearchRegion(
  searchRegionStoreImpl,
  initializeTree,
  devLogger
)

// 3. Create Input Adapters (DI)

// select
// const handleSelectMouseClick = createHandleSelectMouseClick(initializeTree)
const showSearchRegionOverlayEffect = createShowSearchRegionOverlayEffect(
  searchRegionStoreImpl
)
const initializeTreeEffect = createInitializeTreeEffect(
  searchRegionStoreImpl,
  initializeTree
  // transportNameResolver
)
const handleSelectMouseClick = createHandleSelectMouseClick(selectSearchRegion)

// 4. Register Input Adapters

// global
document.addEventListener("keydown", handleGlobalKeydown)

// core
// observers?

// select
document.addEventListener("mousemove", handleSelectMouseMove)
// stop propagation to block click action when selecting region
document.addEventListener("click", handleSelectMouseClick, true)
$effect.root(() => {
  // use case
  $effect(initializeTreeEffect)
  //
  $effect(startListeningAtSelectPhaseEffect)
  $effect(showSearchRegionOverlayEffect)
  $effect(hideRegionOverlayAtListeningEffect)
})

// search

// result
