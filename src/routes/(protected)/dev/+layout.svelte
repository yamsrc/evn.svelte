<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte'
  import { Languages } from '@/iam/ui'
  import { update } from '@/iam'
  import { Authenticated } from '@/app/ui'
  import { Button } from '$ui/button'
  import { dict } from '$lib/intl/dev'
  import { oidc } from '$config'
  import { Screen } from '$com/shell'
  import { Nav } from '$com/shell'
  import { sections } from './sections'
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
    <Nav position="start" sections={sections($dict)} underlay class="z-1000" />
  </Screen>
</Authenticated>
