<script lang="ts">
  import { Async, combined } from 'svas'
  import { Panel } from '$com/panel'
  import { cn } from '$lib/utils'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { contacts } from '@/contacts'
  import type { Props } from './Panel'

  let { favorite, selected = $bindable(), onselect, class: classes }: Props = $props()

  function onclick(event: MouseEvent) {
    if (selected !== undefined && onselect) {
      event.preventDefault()
      selected = !selected
      onselect(favorite.favorite, selected)
    }
  }
</script>

<Async store={combined(contacts, accounts.get(favorite.favorite))}>
  {#snippet awaited([contacts, account])}
    {@const contact = contacts.find((c) => c.identity === favorite.favorite)}
    <Panel
      class={cn(
        'bg-card border border-border min-h-14 w-fit flex-col justify-center gap-0',
        classes,
      )}
      href={`/contacts/${contact?.id}`}
      {selected}
      {onclick}
    >
      {#snippet left()}
        <div class="flex flex-col items-center gap-2 max-w-30 min-w-0 overflow-hidden">
          <Picture {account} class="size-8" />
          <div class="max-w-30 flex items-start overflow-hidden text-start">
            <span class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {account.name}
            </span>
          </div>
        </div>
      {/snippet}
    </Panel>
  {/snippet}
</Async>
