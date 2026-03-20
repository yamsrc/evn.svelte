<script lang="ts">
  import { Archive as ArchiveIcon, Trash2 } from '@lucide/svelte'
  import { archive } from '@/adventures'
  import { Spinner } from '$ui/spinner'
  import { Button } from '$ui/button'
  import { Hold } from '$com/buttons'
  import { goto } from '$app/navigation'
  import { dict } from './intl'
  import type { Props } from './Archive'

  const { adventure }: Props = $props()

  const empty = $derived(adventure.expenses.length === 0)

  let busy = $state(false)

  async function remove() {
    busy = true

    const result = await archive(adventure.id, undefined)

    busy = false

    if (result instanceof Error) return

    goto('/expenses/')
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
      label={$dict.finish.delete.hold}
      variant="destructive"
      position="top"
      duration={2_000}
      class="w-full">
      {#if busy}
        <Spinner />
      {:else}
        <Trash2 />
      {/if}
      {$dict.finish.delete.button(adventure.title)}
    </Hold>
  {:else}
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
