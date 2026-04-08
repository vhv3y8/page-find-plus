import { handleGlobalKeydown } from "./keyboard"
// core
import type { SearchRegionStore } from "@core/adapters/dom/models/SearchRegion"
import { searchRegionStore } from "@core/adapters/dom/impl/searchRegion.svelte"
// features
import {
  handleSelectMouseClick,
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
import { devLogger } from "@infra/adapters/devlogger/main"

devLogger.log("Bootstrap Entry Started")

// 1. Infra / Adapter Impls
// const { treeFacade, transportNameResolver } = createDynamicTransportTreeFacade()
// const treeFacade = createTreeImplFacade()
const treeFacade = createWebWorkerTreeFacade()

// output port impls
const searchRegionStoreImpl: SearchRegionStore = searchRegionStore

// 2. Create Use Cases (DI)

// tree (core)
const initializeTree = treeFacade.initializeTree
const search = treeFacade.search
const updateTreeNode = treeFacade.updateTreeNode

// select

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
  $effect(startListeningAtSelectPhaseEffect)
  $effect(hideRegionOverlayAtListeningEffect)
  $effect(showSearchRegionOverlayEffect)
  $effect(initializeTreeEffect)
})

// search

// result
