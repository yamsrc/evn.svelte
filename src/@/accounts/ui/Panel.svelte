<script lang="ts">
  import { Panel } from '$com/panel'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/app/ui'
  import type { Props } from './Panel'

  let {
    account,
    balance,
    selected = $bindable(),
    onselect,
    action,
    actions,
    href,
    class: classes,
  }: Props = $props()

  function onclick(event: MouseEvent) {
    if (selected !== undefined && onselect) {
      event.preventDefault()
      selected = !selected
      onselect(account.id, selected)
    }
  }

  const actionProps = $derived(action && actions ? { action, actions } : {})
</script>

<Panel
  {href}
  {selected}
  class={cn('bg-card border border-border h-14', classes)}
  {onclick}
  {...actionProps}
>
  {#snippet icon()}
    <Picture {account} class="size-8" />
  {/snippet}
  {#snippet left()}
    <div class="overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
      {account.name}
    </div>
  {/snippet}
  {#snippet right()}
    <Balance {balance} youAreOwed={$dict.contacts.contact.owesYou} />
  {/snippet}
</Panel>
