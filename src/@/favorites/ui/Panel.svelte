<script lang="ts">
  import { Async, combined } from 'svas'
  import { contacts } from '@/contacts'
  import { groups } from '@/groups'
  import Contact from './Contact.svelte'
  import Group from './Group.svelte'
  import type { Props } from './Panel'

  let { favorite, selected = $bindable(), onselect, class: classes }: Props = $props()
</script>

<Async store={combined(contacts, groups)}>
  {#snippet awaited([contacts, groups])}
    {@const group = groups.find(({ id }) => id === favorite.favorite)}
    {@const contact = contacts.find(({ identity }) => identity === favorite.favorite)}

    {#if group}
      <Group {group} bind:selected {onselect} class={classes} />
    {:else if contact}
      <Contact {contact} bind:selected {onselect} class={classes} />
    {/if}
  {/snippet}
</Async>
