<script lang="ts">
  import { Star, Trash2 } from '@lucide/svelte'
  import { Pencil } from '@lucide/svelte'
  import { ok } from 'svas'
  import { dict } from '$lib/intl'
  import { Item } from '@/accounts/ui'
  import { Confirm } from '@/app/ui'
  import * as contacts from '@/contacts'
  import type { Action } from '$com/panel'
  import type { Props } from './Contact'

  const { contact, selected = $bindable(), actionable = false, onselect }: Props = $props()

  let confirmDelete = $state(false)

  function deleteContact() {
    contacts.del(contact)
    confirmDelete = false
  }

  const actions: Action[] = [
    {
      id: 'favorite',
      class: 'bg-foreground hover:bg-foreground/80',
      onclick: () => {},
    },
    {
      id: 'edit',
      class: 'bg-foreground hover:bg-foreground/80',
      onclick: () => {},
    },
    {
      id: 'delete',
      class: 'bg-foreground hover:bg-foreground/80',
      onclick: () => {
        confirmDelete = true
      },
    },
  ]
</script>

{#if ok(contact.account)}
  <Item
    account={contact.account}
    balance={contact.balance}
    {selected}
    {onselect}
    actions={actionable ? actions : []}
  >
    {#snippet action(id)}
      {#if id === 'favorite'}
        <Star size={16} class="text-background" />
      {:else if id === 'edit'}
        <Pencil size={16} class="text-background" />
      {:else if id === 'delete'}
        <Trash2 size={16} class="text-background" />
      {/if}
    {/snippet}
  </Item>
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
