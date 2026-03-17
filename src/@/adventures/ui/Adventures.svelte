<script lang="ts">
  import { unseen } from '@/adventures'
  import { hints } from '@/app/ui/hint/store'
  import Hint from './Hint.svelte'
  import List from './List.svelte'
  import Panel from './Panel.svelte'
  import { dict } from './intl'
  import type { Props } from './Adventures'

  const { adventures, notifications, class: classes }: Props = $props()

  const active = $derived(adventures.filter((a) => !a.archived))
  const archived = $derived(adventures.filter((a) => a.archived))
  const dismissed = $derived($hints?.['adventures'] === true)
  const visible = $derived(active.length > 0 || !dismissed)
</script>

{#if visible}
  <h2>{$dict.title}</h2>
  {#if active.length > 0}
    <List class={classes}>
      {#each active as adventure (adventure.id)}
        {@const highlighted = unseen(adventure, notifications ?? [])}
        <Panel {adventure} link {highlighted} />
      {/each}
      {#each archived as adventure (adventure.id)}
        {@const highlighted = unseen(adventure, notifications ?? [])}
        <Panel {adventure} link {highlighted} />
      {/each}
    </List>
  {:else}
    <Hint />
  {/if}
{/if}
