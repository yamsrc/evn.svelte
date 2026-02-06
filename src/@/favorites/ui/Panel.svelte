<script lang="ts">
  import { Async, combined, ok } from 'svas'
  import { contacts } from '@/contacts'
  import { groups } from '@/groups'
  import Contact from './Contact.svelte'
  import Group from './Group.svelte'
  import type { Props } from './Panel'

  let { favorite, selected = $bindable(), onselect, class: classes }: Props = $props()
</script>

<Async store={combined(contacts, groups)}>
  {#snippet awaited([contactsList, groupsList])}
    {@const group = ok(groupsList) ? groupsList.find((g) => g.id === favorite.favorite) : undefined}
    {@const contact = !group
      ? contactsList.find((c) => c.identity === favorite.favorite)
      : undefined}

    {#if group}
      <Group {group} bind:selected {onselect} class={classes} />
    {:else if contact}
      <Contact {contact} bind:selected {onselect} class={classes} />
    {/if}
  {/snippet}
</Async>
