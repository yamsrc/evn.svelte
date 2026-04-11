<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte'
  import { Paywall } from '@/purchases/ui'
  import { Languages } from '@/iam/ui'
  import { update } from '@/iam'
  import { Authenticated } from '@/app/ui'
  import { Button } from '$ui/button'
  import { oidc } from '$config'
  import { Screen } from '$com/shell'
  import { Nav } from '$com/shell'
  // import { sections } from './sections'
  import type { Locale } from '$lib/intl'

  const { children } = $props()

  function onselect(locale: Locale) {
    update({ locale })
  }
</script>

<Authenticated {oidc}>
  <Screen class="flex-1 flex flex-col justify-between">
    <Languages {onselect} />
    <Button href=".." variant="link" size="sm" class="text-muted-foreground self-start mb-0">
      <ChevronLeft />
      Back
    </Button>
    {@render children()}
    <Nav position="start" underlay class="z-48" />
    <Paywall />
  </Screen>
</Authenticated>
