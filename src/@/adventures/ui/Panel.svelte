<script lang="ts">
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Button } from '$ui/button'
  import { Coins } from '@/app/ui'
  import { Avatars } from '@/app/ui'
  import { account } from '@/iam'
  import { url } from '@/media/ui/Picture'
  import Archived from './Archived.svelte'
  import { dict } from './intl'
  import type { Props } from './Panel'

  const { adventure, class: classes }: Props = $props()

  const members = $derived(Object.keys(adventure.participants).filter((id) => id !== $account?.id))
  const balance = $derived(adventure.participants[$account?.id ?? ''] ?? 0)
  const total = $derived(adventure.expenses.reduce((sum, e) => sum + e.amount, 0))

  const background = $derived(
    adventure.picture
      ? `background-image: url(${url({ id: adventure.picture, path: '/pictures/', variant: '600x400!' })})`
      : undefined,
  )
</script>

<Button
  variant="outline"
  href={`/adventures/${adventure.id}/`}
  size="lg"
  class={[
    'adventure-cover relative isolate w-44 h-auto shrink-0 overflow-hidden rounded-lg',
    'bg-cover bg-center flex-col items-start gap-0 p-3 text-foreground',
    adventure.archived && 'opacity-70',
    classes,
  ]}
  style={background}>
  <div class="h-full relative z-10 flex flex-col justify-between items-start gap-1.5 w-full">
    <TextEllipsis class="font-bold text-base">{adventure.title}</TextEllipsis>

    {#if adventure.archived && adventure.archivedAt}
      <Archived at={adventure.archivedAt} />
    {:else}
      <div class="grid grid-cols-2 gap-x-3 w-full text-start">
        <span class="text-xs font-bold">{$dict.me}</span>
        <span class="text-xs font-bold">{$dict.panel.total}</span>
        <Coins amount={balance} sign="neutral" />
        <Coins amount={total} sign="neutral" />
      </div>
    {/if}

    <Avatars identities={members} />
  </div>
</Button>

<style>
  :global(.adventure-cover)::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--background);
    opacity: 0.7;
    backdrop-filter: blur(0.5px);
  }
</style>
