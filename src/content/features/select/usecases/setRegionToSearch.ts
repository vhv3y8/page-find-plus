import { setSearchRegion } from "@core/adapters/ui/states/region.svelte"
import { getRegionTarget } from "../ui/states/listen.svelte"

export function setRegionToSearch() {
  setSearchRegion(getRegionTarget()!)
}
