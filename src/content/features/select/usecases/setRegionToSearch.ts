import { setSearchRegion } from "@core/adapters/dom/region.svelte"
import { getRegionTarget } from "../ui/states/listen.svelte"

export function setRegionToSearch() {
  setSearchRegion(getRegionTarget()!)
}
