<script lang="ts">
  import { Pencil } from '@lucide/svelte'
  import { ok } from 'svas'
  import { goto, replaceState } from '$app/navigation'
  import * as Picker from '$com/picker'
  import TextEllipsis from '$com/text-ellipsis/TextEllipsis.svelte'
  import { adventures } from '@/adventures'
  import { Avatars } from '@/app/ui'
  import { url } from '@/media/ui/Picture'
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

  const card = 'w-40 shrink-0 overflow-hidden rounded-lg'
</script>

{#if active.length > 0}
  <Picker.Root {picked} scroll={picked} {onpick} snap="start" class="gap-2 px-5 py-1 scroll-px-5">
    <Picker.Option
      variant="outline"
      class={[card, 'flex-col gap-1.5 items-center justify-center text-muted-foreground']}>
      <Pencil />
      <span class="text-sm">{$dict.selector.regular}</span>
    </Picker.Option>

    {#each active as adv (adv.id)}
      <Picker.Option
        variant="outline"
        class={[
          card,
          'cover relative isolate bg-cover bg-center flex-col items-start justify-end px-4 py-3 text-foreground',
        ]}
        style="background-image: url({url({
          id: adv.picture,
          path: '/pictures/',
          variant: '600x400!',
        })})">
        <div class="relative z-10 flex flex-col items-start gap-1 w-full">
          <TextEllipsis>{adv.title}</TextEllipsis>
          <Avatars identities={Object.keys(adv.participants)} max={4} />
        </div>
      </Picker.Option>
    {/each}
  </Picker.Root>
{/if}

<style>
  :global(.cover)::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--background);
    opacity: 0.7;
    backdrop-filter: blur(0.5px);
  }
</style>
