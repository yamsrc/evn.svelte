<script lang="ts">
  import { Nav, Screen } from '$com/shell'

  const { children } = $props()
</script>

<Screen>
  {@render children()}
</Screen>

<Nav />
