import { getPhase } from "@app/phase.svelte"
import { DevLogger } from "@infra/ports/DevLogger"

export const devLogger = new DevLogger([
  // show current phase
  () => {
    const phase = getPhase()
    if (phase === "none") return ""
    else return phase
  }
])
