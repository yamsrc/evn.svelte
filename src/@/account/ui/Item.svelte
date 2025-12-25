<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Panel } from '$com/panel'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { accounts } from '@/account'
  import { Picture } from '@/account/ui'
  import type { Props } from './Item'

  let {
    id,
    balance,
    selected = $bindable(false),
    selectable = false,
    onselect,
    action,
    actions,
  }: Props = $props()

  function onclick(event: MouseEvent) {
    if (selectable && onselect) {
      event.preventDefault()
      selected = !selected
      onselect(id, selected)
    }
  }

  const panelProps = $derived(
    actions && action ? { actions, action } : ({} as { actions?: never; action?: never }),
  )
</script>

<Async store={accounts.get(id)}>
  {#snippet awaited(account)}
    <Panel
      class={cn('bg-card border border-border h-14', { 'bg-accent': selectable && selected })}
      {onclick}
      {...panelProps}
    >
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
            {#if balance > 0}
              {$dict.contacts.contact.owesYou}
            {:else}
              {$dict.contacts.contact.youOwe}
            {/if}
          </div>
          <div class="text-base font-bold">
            {currency(Math.abs(balance))}
          </div>
          <div>
            <Coins size={16} color={balance > 0 ? 'var(--constructive)' : 'var(--destructive)'} />
          </div>
        </div>
      {/snippet}
    </Panel>
  {/snippet}
</Async>
