<script>
  import { onMount } from "svelte"
  import Select from "../features/select/Select.svelte"

  // run bootstrap on mount
  onMount(async () => {
    const { registerInputAdapters } = await import("./bootstrap")
    registerInputAdapters()
  })
</script>

<!-- HTML -->

<Select />
