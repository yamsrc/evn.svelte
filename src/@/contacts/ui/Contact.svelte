<script lang="ts">
  import { Coins, Star, Trash2 } from '@lucide/svelte'
  import { Pencil } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Panel } from '$com/panel'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { accounts } from '@/account'
  import { Picture } from '@/account/ui'
  import * as contacts from '@/contacts'
  import type { Action } from '$com/panel/Panel'
  import type { Props } from './Contact'

  const { contact }: Props = $props()

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

<Async store={accounts.get(contact.identity)}>
  {#snippet awaited(account)}
    <Panel {actions} class="bg-card border border-border h-14">
      {#snippet icon()}
        <Picture {account} class="size-8" />
      {/snippet}
      {#snippet left()}
        <div class="w-full flex items-center gap-2">
          <div class="flex justify-between items-center">
            <div>{account.name}</div>
          </div>
        </div>
      {/snippet}
      {#snippet right()}
        <div class="flex items-center flex-end gap-2">
          <div class="text-muted-foreground text-sm">
            {#if contact.balance > 0}
              {$dict.contacts.contact.owesYou}
            {:else}
              {$dict.contacts.contact.youOwe}
            {/if}
          </div>
          <div class="text-base font-bold">
            {currency(Math.abs(contact.balance))}
          </div>
          <div>
            <Coins
              size={16}
              color={contact.balance > 0 ? 'var(--constructive)' : 'var(--destructive)'}
            />
          </div>
        </div>
      {/snippet}
      {#snippet action(id)}
        {#if id === 'favorite'}
          <Star size={16} class="text-background" />
        {:else if id === 'edit'}
          <Pencil size={16} class="text-background" />
        {:else if id === 'delete'}
          <Trash2 size={16} class="text-background" />
        {/if}
      {/snippet}
    </Panel>
  {/snippet}
</Async>
