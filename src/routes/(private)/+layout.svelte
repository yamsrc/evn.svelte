<script lang="ts">
  import { Nav } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Screen, Authenticated } from '@/app/ui'
  import Actions from './Actions.svelte'
  import { sections } from './sections'

  const { children } = $props()
</script>

<Screen>
  <Authenticated>
    {@render children()}
    <Nav position="start" sections={sections($dict)} class="z-1000" />
    <Actions />
  </Authenticated>
</Screen>
