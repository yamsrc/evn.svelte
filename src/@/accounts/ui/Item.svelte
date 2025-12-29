<script lang="ts">
  import { Panel } from '$com/panel'
  import { cn } from '$lib/utils'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/app/ui'
  import type { Props } from './Item'

  let { account, balance, selected = $bindable(), onselect, action, actions }: Props = $props()

  function onclick(event: MouseEvent) {
    if (selected !== undefined && onselect) {
      event.preventDefault()
      selected = !selected
      onselect(account.id, selected)
    }
  }

  const panelProps = $derived(
    actions && action ? { actions, action } : ({} as { actions?: never; action?: never }),
  )
</script>

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
