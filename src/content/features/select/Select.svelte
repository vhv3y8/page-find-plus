<script lang="ts">
  import { onMount } from "svelte"
  import {
    handleSelectMouseClick,
    handleSelectMouseMove
  } from "./ui/input/mouse"

  onMount(() => {
    window.addEventListener("click", handleSelectMouseClick, true)
  })
</script>

<!-- HTML -->

<svelte:body onmousemove={handleSelectMouseMove} />

<!-- Style -->
