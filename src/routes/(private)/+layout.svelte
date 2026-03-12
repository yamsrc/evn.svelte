<script lang="ts">
  import { derived } from 'svelte/store'
  import { ok } from 'svas'
  import { notifications as store } from '@/notifications'
  import { Screen, Authenticated } from '@/app/ui'
  import { dict } from '$lib/intl'
  import { oidc } from '$config'
  import { Nav } from '$com/shell'
  import { welcome } from './welcome'
  import { sections } from './sections'

  const { children } = $props()
  const notifications = derived(store, ($n) => (ok($n) ? $n : []))
</script>

<Screen>
  <Authenticated {oidc} oncreate={welcome}>
    {@render children()}
    <Nav position="start" sections={sections($dict, $notifications)} underlay class="z-1000" />
  </Authenticated>
</Screen>
