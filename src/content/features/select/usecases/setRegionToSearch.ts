import { setSearchRegion } from "../../../core/adapters/ui/states/region.svelte"
import { currentListeningRegion } from "../ui/states/listen.svelte"

export function setRegionToSearch() {
  if (currentListeningRegion) setSearchRegion(currentListeningRegion)
}
