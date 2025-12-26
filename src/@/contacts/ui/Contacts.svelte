<script lang="ts">
  import Section from '$com/section/Section.svelte'
  import Contact from './Contact.svelte'
  import type { Props } from './Contacts'

  let { contacts, title, actionable, selection = $bindable() }: Props = $props()

  const selectable = $derived(!!selection)

  function onselect(id: string, selected: boolean) {
    if (!selection) return

    if (selected) selection.add(id)
    else selection.delete(id)
  }
</script>

<Section class="flex flex-col gap-1.5">
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#each contacts as contact (contact.id)}
    {@const selected = selection?.has(contact.id)}
    {@const selectedProps = selectable ? { selected, onselect } : undefined}
    <Contact {contact} {actionable} {...selectedProps} />
  {/each}
</Section>
