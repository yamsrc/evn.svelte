<script lang="ts">
  import { Archive as ArchiveIcon } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from './intl'
  import type { Props } from './Archive'

  const { adventure }: Props = $props()

  const empty = $derived(adventure.expenses.length === 0)
</script>

<div class="space-y-2">
  {#if !empty}
    <p class="text-sm text-muted-foreground">{$dict.finish.archive.description}</p>
    <Button
      variant="secondary"
      size="lg"
      class="w-full"
      href={`/adventures/${adventure.id}/archive/`}>
      <ArchiveIcon />
      {$dict.finish.archive.button}
    </Button>
  {/if}
</div>
