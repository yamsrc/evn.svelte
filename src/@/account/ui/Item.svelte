<script lang="ts">
  import { Panel } from '$com/panel'
  import { cn } from '$lib/utils'
  import { Picture } from '@/account/ui'
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
    <div class="overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
      {account.name}
    </div>
  {/snippet}
  {#snippet right()}
    <Balance {balance} />
  {/snippet}
</Panel>
