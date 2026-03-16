<script lang="ts">
  import { ChartPie } from '@lucide/svelte'
  import { ok } from 'svas'
  import { goto, replaceState } from '$app/navigation'
  import * as Picker from '$com/picker'
  import { buttonVariants } from '$ui/button'
  import { adventures } from '@/adventures'
  import Panel from './Panel.svelte'
  import { dict } from './intl'
  import type { Props } from './Selector'

  const { id, draft, onchange }: Props = $props()

  const active = $derived((ok($adventures) ? $adventures : []).filter((a) => !a.archived))

  // svelte-ignore state_referenced_locally
  let picked = $state(id ? active.findIndex((a) => a.id === id) + 1 : 0)

  function onpick(index: number) {
    if (index === picked) return

    const state = { expense: { ...draft, attachments: [...draft.attachments] } }

    if (index === 0) return goto('/expenses/editor/', { replaceState: true, state })

    const path = `/adventures/${active[index - 1].id}/expenses/editor/`

    if (picked > 0) {
      replaceState(path, state)
      picked = index
      onchange?.(active[index - 1].id)
    } else goto(path, { replaceState: true, state })
  }

  const card = 'shrink-0 overflow-hidden rounded-lg'
</script>

{#if active.length > 0}
  <Picker.Root {picked} {onpick} align="start" bleed class="gap-2 py-1">
    <Picker.Option
      index={0}
      class={[
        buttonVariants({ variant: 'outline' }),
        card,
        'w-20 flex-col gap-1.5 items-center justify-center text-muted-foreground',
      ]}>
      <ChartPie />
      <span class="text-sm">{$dict.selector.regular}</span>
    </Picker.Option>

    {#each active as adventure, index (adventure.id)}
      <Picker.Option variant="outline" class={[card, 'w-40 p-0']} index={index + 1}>
        <Panel {adventure} class="size-full" />
      </Picker.Option>
    {/each}
  </Picker.Root>
{/if}
