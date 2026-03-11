<script lang="ts">
  import { Archive as ArchiveIcon, Trash2 } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from './intl'
  import type { Props } from './Archive'

  const { empty }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.finish.title}</h2>
  <p class="text-sm text-muted-foreground">{$dict.finish.description}</p>
  <Button
    id="adventures-editor-archive-button"
    variant="secondary"
    size="lg"
    class="w-full"
    href="archive/">
    {#if empty}
      <Trash2 />
      {$dict.finish.delete}
    {:else}
      <ArchiveIcon />
      {$dict.finish.button}
    {/if}
  </Button>
</div>
