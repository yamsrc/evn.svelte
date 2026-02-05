<script lang="ts">
  import { ok } from 'svas'
  import { derived } from 'svelte/store'
  import { Nav } from '$com/shell'
  import { oidc } from '$config'
  import { dict } from '$lib/intl'
  import { Screen, Authenticated } from '@/app/ui'
  import { notifications as store } from '@/notifications'
  import { sections } from './sections'
  import { welcome } from './welcome'

  const { children } = $props()
  const notifications = derived(store, ($n) => (ok($n) ? $n : []))
</script>

<Screen>
  <Authenticated {oidc} oncreate={welcome}>
    <a href="/dev/">dev</a>
    {@render children()}
    <Nav position="start" sections={sections($dict, $notifications)} class="z-1000" />
  </Authenticated>
</Screen>
