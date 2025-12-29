<script lang="ts">
  import Section from '$com/section/Section.svelte'
  import { filter } from '@/contacts'
  import Contact from './Contact.svelte'
  import type { Props } from './Contacts'

  let { contacts, title, actionable, selection = $bindable(), search }: Props = $props()

  const selectable = $derived(!!selection)

  function onselect(identity: string, selected: boolean) {
    if (!selection) return

    const contact = contacts.find((c) => c.identity === identity)

    if (!contact) return

    if (selected) selection.add(identity)
    else selection.delete(identity)
  }
</script>

<Section class="flex flex-col gap-1.5">
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#each filter(contacts, search) as contact (contact.identity)}
    {@const selected = selection?.has(contact.identity)}
    {@const selectedProps = selectable ? { selected, onselect } : undefined}
    <Contact {contact} {actionable} {...selectedProps} />
  {/each}
</Section>
