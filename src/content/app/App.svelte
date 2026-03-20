<script>
  import { onMount } from "svelte"
  import Select from "../features/select/Select.svelte"
  import bootstrap from "./bootstrap"

  // run bootstrap on mount
  onMount(() => {
    bootstrap()
  })
</script>

<!-- HTML -->

<Select />

<!-- Style -->
