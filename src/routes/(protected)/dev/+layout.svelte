<script lang="ts">
  import { Screen } from '$com/shell'

  const { children } = $props()
</script>

<Screen class="flex-1 flex flex-col justify-between">
  {@render children()}
</Screen>
