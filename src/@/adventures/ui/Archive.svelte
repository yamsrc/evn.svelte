<script lang="ts">
  import { Archive as ArchiveIcon, Trash2 } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from './intl'
  import type { Props } from './Archive'
  import type { Snippet } from 'svelte'

  const { id, empty, title }: Props = $props()
</script>

{#snippet action(heading: string, description: string, icon: Snippet, label: string)}
  <div class="space-y-2">
    <h2>{heading}</h2>
    <p class="text-sm text-muted-foreground">{description}</p>
    <Button variant="secondary" size="lg" class="w-full" href={`/adventures/${id}/archive/`}>
      {@render icon()}
      {label}
    </Button>
  </div>
{/snippet}

{#snippet trash()}<Trash2 />{/snippet}
{#snippet archive()}<ArchiveIcon />{/snippet}

{#if empty}
  {@render action(
    $dict.finish.delete.title,
    $dict.finish.delete.description,
    trash,
    $dict.finish.delete.button(title),
  )}
{:else}
  {@render action(
    $dict.finish.archive.title,
    $dict.finish.archive.description,
    archive,
    $dict.finish.archive.button,
  )}
{/if}
