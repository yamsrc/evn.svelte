<script lang="ts">
  import { Balance } from '@/app/ui'
  import { Picture } from '@/accounts/ui'
  import { cn } from '$lib/utils'
  import { dict } from '$lib/intl'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Attention } from '$com/shell'
  import { Panel } from '$com/panel'
  import type { Props } from './Panel'

  let {
    account,
    balance,
    selected = $bindable(),
    highlighted,
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
  {...actionProps}>
  {#snippet icon()}
    <Picture {account} class="size-8" />
  {/snippet}
  {#snippet left()}
    <div class="flex items-center gap-2 min-w-0">
      <TextEllipsis>{account.name}</TextEllipsis>
      {#if highlighted}
        <Attention />
      {/if}
    </div>
  {/snippet}
  {#snippet right()}
    {#if balance}
      <Balance {balance} youAreOwed={$dict.contacts.contact.owesYou} />
    {/if}
  {/snippet}
</Panel>
