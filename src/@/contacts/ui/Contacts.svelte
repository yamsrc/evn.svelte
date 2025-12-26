<script lang="ts">
  import Section from '$com/section/Section.svelte'
  import Contact from './Contact.svelte'
  import type { ContactWithAccount } from './Contact'
  import type { Props } from './Contacts'

  let { contacts, title, actionable, selection = $bindable(), filter }: Props = $props()

  const selectable = $derived(!!selection)

  function onselect(identity: string, selected: boolean) {
    if (!selection) return

    const contact = contacts.find((c) => c.identity === identity)

    if (!contact) return

    if (selected) selection.add(contact.id)
    else selection.delete(contact.id)
  }

  function search(contact: ContactWithAccount): boolean {
    if (!filter) return true

    return contact.account.name?.toLowerCase().includes(filter.toLowerCase()) ?? false
  }
</script>

<Section class="flex flex-col gap-1.5">
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#each contacts.filter(search) as contact (contact.identity)}
    {@const selected = selection?.has(contact.id)}
    {@const selectedProps = selectable ? { selected, onselect } : undefined}
    <Contact {contact} {actionable} {...selectedProps} />
  {/each}
</Section>
