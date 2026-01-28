<script lang="ts">
  import { ok } from 'svas'
  import { Section } from '@/app/ui'
  import Panel from './Panel.svelte'
  import type { Props } from './Contacts'

  let { contacts, title, actionable, selection = $bindable(), notifications }: Props = $props()

  const selectable = $derived(selection !== undefined)

  const unseen = (id: string, identity?: string) =>
    notifications?.some(
      (n) =>
        (n.domain === 'contacts' && n.key === id) ||
        (n.domain === 'accounts' && n.event === 'unchained' && n.key === identity),
    ) ?? false

  function onselect(identity: string, selected: boolean) {
    if (!selection) return

    const contact = contacts.find((c) => c.identity === identity)

    if (!contact) return

    if (selected) selection.add(identity)
    else selection.delete(identity)
  }
</script>

{#if contacts.length}
  <Section class="flex flex-col gap-1.5" id="contacts-list">
    {#if title}
      <h2>{title}</h2>
    {/if}
    <div id="contacts-list-content" class="flex flex-col gap-1.5">
      {#each contacts as contact (contact.id)}
        {@const selected = selection?.has(contact.identity)}
        {@const account = ok(contact.account) ? contact.account : null}
        {@const highlighted = unseen(contact.id, account?.id)}
        {@const selectedProps = selectable ? { selected, onselect } : undefined}
        <Panel {contact} {actionable} {highlighted} {...selectedProps} />
      {/each}
    </div>
  </Section>
{/if}
