<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte'
  import { Screen } from '$com/shell'
  import { oidc } from '$config'
  import { Button } from '$ui/button'
  import { Authenticated } from '@/app/ui'
  import { update } from '@/iam'
  import { Languages } from '@/iam/ui'
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
  </Screen>
</Authenticated>
