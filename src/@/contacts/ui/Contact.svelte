<script lang="ts">
  import { Star, Trash2 } from '@lucide/svelte'
  import { Pencil } from '@lucide/svelte'
  import { Item } from '@/account/ui'
  import * as contacts from '@/contacts'
  import type { Action } from '$com/panel'
  import type { Props } from './Contact'

  const {
    contact,
    selected = false,
    actionable = false,
    selectable = false,
    onselect,
  }: Props = $props()

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
      onclick: () => contacts.del(contact),
    },
  ]
</script>

<Item
  id={contact.identity}
  balance={contact.balance}
  {selectable}
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
