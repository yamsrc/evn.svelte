<script lang="ts">
  import { Async } from 'svas'
  import { Picture } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Ellipsis } from '$com/text'
  import { Panel } from '$com/panel'
  import type { Props } from './Contact'

  let { contact, selected = $bindable(), onselect, class: classes }: Props = $props()

  function onclick(event: MouseEvent) {
    if (selected === undefined || onselect === undefined) return

    event.preventDefault()
    selected = !selected
    onselect(contact.identity, selected)
  }
</script>

<Async store={accounts.get(contact.identity)}>
  {#snippet awaited(account)}
    <Panel
      class={['bg-card border border-border w-max flex-col gap-0', classes]}
      href={`/contacts/${contact.identity}/`}
      {selected}
      {onclick}>
      {#snippet left()}
        <div class="flex flex-col items-center gap-2 max-w-30">
          <div class="shrink-0 flex">
            <Picture {account} class="size-8 shrink-0" />
          </div>
          <div class="max-w-30 flex items-start overflow-hidden text-start">
            <Ellipsis>
              {account.name}
            </Ellipsis>
          </div>
        </div>
      {/snippet}
    </Panel>
  {/snippet}
</Async>
