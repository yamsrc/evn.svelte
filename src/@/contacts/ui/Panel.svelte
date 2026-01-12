<script lang="ts">
  import { Star, Trash2 } from '@lucide/svelte'
  import { Pencil } from '@lucide/svelte'
  import { ok } from 'svas'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { Panel } from '@/accounts/ui'
  import { Confirm } from '@/app/ui'
  import * as contacts from '@/contacts'
  import type { Action } from '$com/panel'
  import type { Props } from './Panel'

  const { contact, selected = $bindable(), actionable = false, onselect }: Props = $props()

  let confirmDelete = $state(false)

  function deleteContact() {
    contacts.del(contact)
    confirmDelete = false
  }

  const fav: Action = $derived({
    id: 'favorite',
    onclick: () => {},
  })

  const del: Action = $derived({
    id: 'delete',
    onclick: () => {
      confirmDelete = true
    },
  })

  const actions = $derived([fav, del])
</script>

{#if ok(contact.account)}
  <Panel
    href={`/contacts/${contact.id}/`}
    account={contact.account}
    balance={contact.balance}
    {selected}
    {onselect}
    actions={actionable ? actions : []}
    class={cn('font-normal', contact.managed && 'text-muted-foreground', 'contacts-panel')}
  >
    {#snippet action(id)}
      {#if id === 'favorite'}
        <Star size={16} class="text-background" />
      {:else if id === 'edit'}
        <Pencil size={16} class="text-background" />
      {:else if id === 'delete'}
        <Trash2 size={16} class="text-destructive" />
      {/if}
    {/snippet}
  </Panel>
{/if}

<Confirm
  title={$dict.contacts.delete.confirm.title}
  description={$dict.contacts.delete.confirm.description}
  bind:open={confirmDelete}
  onconfirm={deleteContact}
>
  {#snippet confirm()}
    <Trash2 />
    {$dict.contacts.delete.confirm.confirm}
  {/snippet}
</Confirm>
