<script lang="ts">
  import { Star, Trash2 } from '@lucide/svelte'
  import { Pencil } from '@lucide/svelte'
  import { ok } from 'svas'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { Panel } from '@/accounts/ui'
  import { Confirm } from '@/app/ui'
  import * as contacts from '@/contacts'
  import * as favorites from '@/favorites'
  import { favorites as store } from '@/favorites'
  import type { Action } from '$com/panel'
  import type { Props } from './Panel'

  const {
    contact,
    selected = $bindable(),
    actionable = false,
    highlighted,
    onselect,
  }: Props = $props()

  let confirmDelete = $state(false)

  const favorite = $derived(
    ok($store) ? $store.find((f) => f.favorite === contact.identity) : undefined,
  )

  function deleteContact() {
    void contacts.del(contact)
    confirmDelete = false
  }

  const fav: Action = $derived({
    id: 'favorite',
    onclick: () => {
      if (favorite) void favorites.del(favorite.id)
      else void favorites.add(contact.identity)
    },
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
    href={`/contacts/${contact.identity}/`}
    account={contact.account}
    balance={contact.balance}
    {selected}
    {highlighted}
    {onselect}
    actions={actionable ? actions : []}
    class={cn(contact.managed && 'text-muted-foreground', 'contacts-panel')}>
    {#snippet action(id)}
      {#if id === 'favorite'}
        <Star size={16} class="text-background" fill={favorite ? 'currentColor' : 'none'} />
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
  onconfirm={deleteContact}>
  {#snippet confirm()}
    <Trash2 />
    {$dict.contacts.delete.confirm.confirm}
  {/snippet}
</Confirm>
