<script lang="ts">
  import { Async } from 'svas'
  import { Nav } from '$com/shell'
  import { oidc } from '$config'
  import { dict } from '$lib/intl'
  import { Screen, Authenticated } from '@/app/ui'
  import { notifications } from '@/notifications'
  import { sections } from './sections'
  import { welcome } from './welcome'

  const { children } = $props()
</script>

<Screen>
  <Authenticated {oidc} oncreate={welcome}>
    {@render children()}
    <Async store={notifications}>
      {#snippet awaited(notifications)}
        <Nav position="start" sections={sections($dict, notifications)} class="z-1000" />
      {/snippet}
    </Async>
  </Authenticated>
</Screen>
