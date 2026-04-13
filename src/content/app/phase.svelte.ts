import { devLogger } from "../infra/impls/devlogger/main"

type Phase = "none" | "select" | "search" | "result"
let phase: Phase = $state("none")

// $effect.root(() => {
//   $effect(() => {
//     switch (phase) {
//       case "select": {
//         startListening()
//         break
//       }
//       case "search": {
//         // dom tree for dev
//         break
//       }
//     }
//   })
// })

// if (import.meta.env.MODE === "development") {
//   $effect.root(() => {
//     $effect(() => {
//       devLogger.log("Phase Update", phase)
//     })
//   })
// }

export function getPhase() {
  return phase
}
export function setPhase(p: Phase) {
  phase = p
}
