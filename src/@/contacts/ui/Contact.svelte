<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { Async } from 'svas'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import * as Item from '$ui/item'
  import { accounts } from '@/account'
  import { Picture } from '@/account/ui'
  import type { Props } from './Contact'

  const { contact }: Props = $props()
</script>

<Async store={accounts.get(contact.identity)}>
  {#snippet awaited(account)}
    <Item.Root variant="muted" size="sm" class="bg-card border border-border">
      <Item.Media>
        <Picture {account} class="size-8" />
      </Item.Media>
      <Item.Content>
        <div class="flex justify-between items-center">
          <Item.Title>{account.name}</Item.Title>
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
        </div>
      </Item.Content>
    </Item.Root>
  {/snippet}
</Async>
