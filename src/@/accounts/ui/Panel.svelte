<script lang="ts">
  import { Panel } from '$com/panel'
  import { Attention } from '$com/shell'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { dict } from '$lib/intl'
  import { deleted } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/app/ui'
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

  const isDeleted = $derived(deleted(account))

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
  class={['bg-card border border-border h-14', isDeleted && 'text-muted-foreground opacity-60', classes]}
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
    {#if balance && !isDeleted}
      <Balance {balance} youAreOwed={$dict.contacts.contact.owesYou} />
    {/if}
  {/snippet}
</Panel>
