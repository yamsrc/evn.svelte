<script lang="ts">
  import { UserPlus } from '@lucide/svelte'
  import { add } from '@/receipts/svc/add'
  import { Participants, actionVariants } from '@/app/ui'
  import { Actions } from '$com/shell'
  import Lock from './Lock.svelte'
  import Done from './Done.svelte'
  import type { Props } from './Actions'

  const { receipt, actor }: Props = $props()

  function onadd(identities: string[]) {
    add(receipt.id, identities)
  }
</script>

<Actions>
  {#if receipt.done[actor] !== true}
    <Participants.Button
      class={actionVariants({ variant: receipt.identities.length === 1 ? 'default' : 'secondary' })}
      exclude={receipt.identities}
      {onadd}>
      <UserPlus />
    </Participants.Button>
  {/if}
  <Done
    {receipt}
    {actor}
    variant={receipt.identities.length === 1 || receipt.done[actor] === true
      ? 'secondary'
      : 'default'} />
  {#if receipt.done[actor] === true}
    <Lock {receipt} {actor} />
  {/if}
</Actions>
