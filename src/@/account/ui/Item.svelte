<script lang="ts">
  import { Async } from 'svas'
  import { Panel } from '$com/panel'
  import { cn } from '$lib/utils'
  import { accounts } from '@/account'
  import { Picture } from '@/account/ui'
  import { Balance } from '@/app/ui'
  import type { Props } from './Item'

  let { id, balance, selected = $bindable(), onselect, action, actions }: Props = $props()

  function onclick(event: MouseEvent) {
    if (selected !== undefined && onselect) {
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
    <Panel {selected} class={cn('bg-card border border-border h-14')} {onclick} {...panelProps}>
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
        <Balance {balance} />
      {/snippet}
    </Panel>
  {/snippet}
</Async>
