<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import * as Item from '$ui/item'
  import { Picture } from '@/account/ui'
  import type { Props } from './Contact'

  const { contact }: Props = $props()
</script>

{#if contact.account}
  <Item.Root variant="muted" size="sm" class="bg-card border border-border">
    <Item.Media>
      <Picture account={contact.account} class="size-8" />
    </Item.Media>
    <Item.Content>
      <div class="flex justify-between items-center">
        <Item.Title>{contact.account.name}</Item.Title>
        <div class="flex items-center flex-end gap-2">
          <div class="text-muted-foreground text-sm">
            {#if contact.balance > 0}
              {$dict.contacts.contact.owesYou}
            {:else}
              {$dict.contacts.contact.youOwe}
            {/if}
          </div>
          <div class="text-base font-bold">
            {Math.abs(contact.balance)}
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
{/if}
