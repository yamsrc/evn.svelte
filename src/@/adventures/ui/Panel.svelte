<script lang="ts">
  import { account } from '@/iam'
  import { Avatars, Coins } from '@/app/ui'
  import { Button } from '$ui/button'
  import { ellipsis } from '$com/text'
  import { Trim } from '$com/text'
  import { Attention } from '$com/shell'
  import { dict } from './intl'
  import Picture from './Picture.svelte'
  import Archived from './Archived.svelte'
  import type { Props } from './Panel'

  const { adventure, link, highlighted, class: classes }: Props = $props()

  const full = $derived('participants' in adventure ? adventure : null)

  const identities = $derived.by(() => {
    if (full) return Object.keys(full.participants)

    return 'identities' in adventure ? adventure.identities : []
  })

  const balance = $derived(full?.participants[$account?.id ?? ''] ?? 0)
  const total = $derived(full?.expenses.reduce((sum, e) => sum + e.amount, 0) ?? 0)

  const base = 'adventure-cover relative isolate overflow-hidden rounded-lg bg-cover bg-center p-3'
</script>

{#snippet content()}
  <Picture {adventure} class="absolute size-full inset-0 -z-1 object-cover" />

  <div class="relative z-10 flex h-full flex-col items-start gap-1.5 w-full justify-between">
    <Trim class={['font-bold text-base', ellipsis()]}>{adventure.title}</Trim>
    {#if highlighted}
      <Attention class="absolute top-0 inset-e-0 z-10" />
    {/if}

    {#if link && full}
      {#if full.archived && full.archivedAt}
        <Archived at={full.archivedAt} />
      {:else}
        <div class="grid grid-cols-2 gap-x-3 w-full text-start">
          <span class="text-xs font-bold">{$dict.me}</span>
          <span class="text-xs font-bold">{$dict.panel.total}</span>
          <Coins amount={balance} sign="neutral" />
          <Coins amount={total} sign="neutral" />
        </div>
      {/if}
    {/if}

    <Avatars {identities} />
  </div>
{/snippet}

{#if link}
  <Button
    variant="outline"
    href={`/adventures/${adventure.id}/`}
    size="lg"
    class={[
      base,
      'h-auto shrink-0 flex-col items-start gap-0 text-foreground',
      full?.archived && 'opacity-70',
      classes,
    ]}>
    {@render content()}
  </Button>
{:else}
  <div class={[base, 'text-foreground', classes]}>
    {@render content()}
  </div>
{/if}

<style>
  :global(.adventure-cover)::before {
    content: '';
    position: absolute;
    inset: 0;
    background: color-mix(in oklch, var(--background) 70%, transparent);
    backdrop-filter: blur(0.5px);
  }
</style>
