<script lang="ts">
  import { unseen } from '@/adventures'
  import List from './List.svelte'
  import Panel from './Panel.svelte'
  import type { Props } from './Adventures'

  const { adventures, notifications, class: classes }: Props = $props()

  const active = $derived(adventures.filter((a) => !a.archived))
  const archived = $derived(adventures.filter((a) => a.archived))
</script>

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
