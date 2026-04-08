<script lang="ts">
  import { List } from '@/app/ui'
  import { unseen } from '@/adventures'
  import Panel from './Panel.svelte'
  import type { Props } from './Adventures'

  const { adventures, notifications, class: classes }: Props = $props()

  const sorted = $derived(adventures.sort((a, b) => Number(a.archived) - Number(b.archived)))
</script>

<List.Root class={classes}>
  {#each sorted as adventure (adventure.id)}
    {@const highlighted = unseen(adventure, notifications ?? [])}
    <List.Option>
      <Panel {adventure} link {highlighted} class="size-full" />
    </List.Option>
  {/each}
</List.Root>
