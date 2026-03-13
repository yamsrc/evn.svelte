<script lang="ts">
  import { Scrollable } from '$com/scrollable'
  import { hints } from '@/app/ui/hint/store'
  import Hint from './Hint.svelte'
  import Panel from './Panel.svelte'
  import { dict } from './intl'
  import type { Props } from './Adventures'

  const { adventures, class: classes }: Props = $props()

  const active = $derived(adventures.filter((a) => !a.archived))
  const archived = $derived(adventures.filter((a) => a.archived))
  const dismissed = $derived($hints?.['adventures'] === true)
  const visible = $derived(active.length > 0 || !dismissed)
</script>

{#if visible}
  <h2>{$dict.title}</h2>
  {#if active.length > 0}
    <Scrollable class={`-mx-5 px-5 scroll-px-5 gap-1.5 py-2 -my-2 ${classes ?? ''}`}>
      {#each active as adventure (adventure.id)}
        <Panel {adventure} link />
      {/each}
      {#each archived as adventure (adventure.id)}
        <Panel {adventure} link />
      {/each}
    </Scrollable>
  {:else}
    <Hint />
  {/if}
{/if}
