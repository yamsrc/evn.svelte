<script lang="ts">
  import { UserPlus, Check } from '@lucide/svelte'
  import { add } from '@/receipts/svc/add'
  import { Action, Participants, actionVariants } from '@/app/ui'
  import { Actions } from '$com/shell'
  import type { Props } from './Actions'

  const { receipt }: Props = $props()

  function onadd(identities: string[]) {
    add(receipt.id, identities)
  }
</script>

<Actions>
  <Participants.Button
    class={actionVariants({ variant: receipt.identities.length === 1 ? 'default' : 'secondary' })}
    exclude={receipt.identities}
    {onadd}>
    <UserPlus />
  </Participants.Button>
  <Action
    id="nav-action-receipt-split"
    variant={receipt.identities.length === 1 ? 'secondary' : 'default'}>
    <Check />
  </Action>
</Actions>
