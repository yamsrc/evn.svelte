<script lang="ts">
  import { Section } from '@/app/ui'
  import { filter } from '@/contacts'
  import Panel from './Panel.svelte'
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

<Section class="flex flex-col gap-1.5" id="contacts-list">
  {#if title}
    <h2>{title}</h2>
  {/if}
  <div id="contacts-list-content" class="flex flex-col gap-1.5">
    {#each filter(contacts, search) as contact (contact.identity)}
      {@const selected = selection?.has(contact.identity)}
      {@const selectedProps = selectable ? { selected, onselect } : undefined}
      <Panel {contact} {actionable} {...selectedProps} />
    {/each}
  </div>
</Section>
