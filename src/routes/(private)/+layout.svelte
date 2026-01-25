<script lang="ts">
  import { Nav } from '$com/shell'
  import { oidc } from '$config'
  import { dict } from '$lib/intl'
  import { Screen, Authenticated } from '@/app/ui'
  import { sections } from './sections'
  import { welcome } from './welcome'

  const { children } = $props()
</script>

<Screen>
  <Authenticated {oidc} oncreate={welcome}>
    {@render children()}
    <Nav position="start" sections={sections($dict)} class="z-1000" />
  </Authenticated>
</Screen>
