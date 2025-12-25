<script lang="ts">
  import Section from '$com/section/Section.svelte'
  import Contact from './Contact.svelte'
  import type { Props } from './Contacts'

  let { contacts, title, actionable, selectable, selection = $bindable([]) }: Props = $props()

  function select(id: string, selected: boolean) {
    if (selected) selection.push(id)
    else selection = selection.filter((i) => i !== id)
  }
</script>

<Section class="flex flex-col gap-1">
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#each contacts as contact (contact.id)}
    {@const selected = selection.includes(contact.id)}
    <Contact {contact} {actionable} {selectable} {selected} onselect={select} />
  {/each}
</Section>
