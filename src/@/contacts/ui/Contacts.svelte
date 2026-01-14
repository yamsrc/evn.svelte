<script lang="ts">
  import { Section } from '@/app/ui'
  import { filter } from '@/contacts'
  import Panel from './Panel.svelte'
  import type { Props } from './Contacts'

  let { contacts, title, actionable, selection = $bindable(), search }: Props = $props()

  const selectable = $derived(selection !== undefined)

  const filtered = $derived(filter(contacts, search))

  function onselect(identity: string, selected: boolean) {
    if (!selection) return

    const contact = contacts.find((c) => c.identity === identity)

    if (!contact) return

    if (selected) selection.add(identity)
    else selection.delete(identity)
  }
</script>

{#if filtered.length}
  <Section class="flex flex-col gap-1.5" id="contacts-list">
    {#if title}
      <h2>{title}</h2>
    {/if}
    <div id="contacts-list-content" class="flex flex-col gap-1.5">
      {#each filtered as contact (contact.id)}
        {@const selected = selection?.has(contact.identity)}
        {@const selectedProps = selectable ? { selected, onselect } : undefined}
        <Panel {contact} {actionable} {...selectedProps} />
      {/each}
    </div>
  </Section>
{/if}
