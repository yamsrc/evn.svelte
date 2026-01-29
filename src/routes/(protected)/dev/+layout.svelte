<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte'
  import { Screen } from '$com/shell'
  import { oidc } from '$config'
  import { Button } from '$ui/button'
  import { Authenticated } from '@/app/ui'

  const { children } = $props()
</script>

<Authenticated {oidc}>
  <Screen class="flex-1 flex flex-col justify-between">
    <Button href=".." variant="link" size="sm" class="text-muted-foreground self-start mb-0">
      <ChevronLeft />
      Back
    </Button>
    {@render children()}
  </Screen>
</Authenticated>
