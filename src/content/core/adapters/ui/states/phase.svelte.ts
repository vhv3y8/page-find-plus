import { startListening } from "@features/select/ui/states/listen.svelte"

type Phase = "none" | "select" | "search" | "result"
let phase: Phase = $state("none")

$effect.root(() => {
  $effect(() => {
    if (phase === "select") {
      startListening()
    }
  })
})

if (import.meta.env.MODE === "development") {
  $effect.root(() => {
    $effect(() => {
      console.log("[page find plus] [phase update]", phase)
    })
  })
}

export function getPhase() {
  return phase
}
export function setPhase(p: Phase) {
  phase = p
}
