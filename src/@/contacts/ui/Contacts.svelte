<script lang="ts">
  import Section from '$com/section/Section.svelte'
  import Contact from './Contact.svelte'
  import type { Props } from './Contacts'

  let { contacts, title, actionable, selection = $bindable() }: Props = $props()

  const selectable = $derived(!!selection)

  function onselect(identity: string, selected: boolean) {
    if (!selection) return

    if (selected) selection.add(contacts.find((c) => c.identity === identity)?.id ?? '')
    else selection.delete(contacts.find((c) => c.identity === identity)?.id ?? '')
  }
</script>

<Section class="flex flex-col gap-1.5">
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#each contacts as contact (contact.identity)}
    {@const selected = selection?.has(contact.id)}
    {@const selectedProps = selectable ? { selected, onselect } : undefined}
    <Contact {contact} {actionable} {...selectedProps} />
  {/each}
</Section>
