<script lang="ts">
  import { ok } from 'svas'
  import { ChartPie } from '@lucide/svelte'
  import { List } from '@/app/ui'
  import { adventures } from '@/adventures'
  import { buttonVariants } from '$ui/button'
  import { replace } from '$com/history'
  import { replaceState } from '$app/navigation'
  import { dict } from './intl'
  import Panel from './Panel.svelte'
  import type { Props } from './Selector'

  const { id, draft, onchange }: Props = $props()

  const active = $derived((ok($adventures) ? $adventures : []).filter((a) => !a.archived))

  // svelte-ignore state_referenced_locally
  let picked = $state(id ? active.findIndex((a) => a.id === id) + 1 : 0)

  function onpick(index: number) {
    if (index === picked) return

    const state = { expense: { ...draft, attachments: [...draft.attachments] } }

    if (index === 0) return replace('/expenses/editor/', state)

    const path = `/adventures/${active[index - 1].id}/expenses/editor/`

    if (picked > 0) {
      replaceState(path, state)
      picked = index
      onchange?.(active[index - 1].id)
    } else replace(path, state)
  }

  const card = 'shrink-0 overflow-hidden rounded-lg'
</script>

{#if active.length > 0}
  <List.Root {picked} {onpick} align="start" class="py-1 -my-1">
    <List.Option
      index={0}
      class={[
        buttonVariants({ variant: 'outline' }),
        card,
        'w-20! flex-col items-center justify-center text-muted-foreground',
      ]}>
      <ChartPie />
      <span class="text-sm">{$dict.selector.regular}</span>
    </List.Option>

    {#each active as adventure, index (adventure.id)}
      <List.Option variant="outline" class={[card, 'p-0']} index={index + 1}>
        <Panel {adventure} class="size-full" />
      </List.Option>
    {/each}
  </List.Root>
{/if}
