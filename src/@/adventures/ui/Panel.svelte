<script lang="ts">
  import { Attention } from '$com/shell'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Button } from '$ui/button'
  import { Avatars, Coins } from '@/app/ui'
  import { account } from '@/iam'
  import { url } from '@/media/ui/Picture'
  import Archived from './Archived.svelte'
  import { dict } from './intl'
  import type { Props } from './Panel'

  const { adventure, link, highlighted, class: classes }: Props = $props()

  const full = $derived('participants' in adventure ? adventure : null)

  const identities = $derived.by(() => {
    if (full) return Object.keys(full.participants)

    return 'identities' in adventure ? adventure.identities : []
  })

  const balance = $derived(full?.participants[$account?.id ?? ''] ?? 0)
  const total = $derived(full?.expenses.reduce((sum, e) => sum + e.amount, 0) ?? 0)

  const background = $derived(
    adventure.picture
      ? `background-image: url(${url({ id: adventure.picture, path: '/pictures/', variant: '600x400!' })})`
      : undefined,
  )

  const base = 'adventure-cover relative isolate overflow-hidden rounded-lg bg-cover bg-center p-3'
</script>

{#snippet content()}
  <div class="relative z-10 flex h-full flex-col items-start gap-1.5 w-full justify-between">
    <TextEllipsis class="font-bold text-base">{adventure.title}</TextEllipsis>
    {#if highlighted}
      <Attention class="absolute top-0 end-0 z-10" />
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
      'w-44 h-auto shrink-0 flex-col items-start gap-0 p-3 text-foreground',
      full?.archived && 'opacity-70',
      classes,
    ]}
    style={background}>
    {@render content()}
  </Button>
{:else}
  <div class={[base, 'text-foreground', classes]} style={background}>
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
