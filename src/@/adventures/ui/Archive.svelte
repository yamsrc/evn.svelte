<script lang="ts">
  import { Archive as ArchiveIcon, Trash2 } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { Hold } from '$com/buttons'
  import { Button } from '$ui/button'
  import { archive } from '@/adventures'
  import { dict } from './intl'
  import type { Props } from './Archive'

  const { id, value }: Props = $props()

  const empty = $derived(value.title === 'FIX_ME')

  let busy = $state(false)

  async function remove() {
    busy = true

    const result = await archive(id, undefined)

    busy = false

    if (result instanceof Error) return

    goto('/')
  }
</script>

<div class="space-y-2">
  <h2>{$dict.finish.archive.title}</h2>
  {#if empty}
    <Hold
      size="lg"
      name="adventures-delete"
      onclick={remove}
      disabled={busy}
      label={$dict.finish.delete.button(value.title)}
      variant="destructive"
      position="top"
      duration={2_000}
      class="w-full">
      <Trash2 />
      {$dict.finish.delete.button(value.title)}
    </Hold>
  {:else}
    <p class="text-sm text-muted-foreground">{$dict.finish.archive.description}</p>
    <Button variant="secondary" size="lg" class="w-full" href={`/adventures/${id}/archive/`}>
      <ArchiveIcon />
      {$dict.finish.archive.button}
    </Button>
  {/if}
</div>
