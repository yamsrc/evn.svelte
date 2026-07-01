<script lang="ts">
  import { UserPlus } from '@lucide/svelte'
  import { add } from '@/receipts'
  import { Participants, actionVariants } from '@/app/ui'
  import { transit } from '$lib/tools'
  import { Actions } from '$com/shell'
  import Unlock from './Unlock.svelte'
  import Done from './Done.svelte'
  import type { Props } from './Actions'

  let { receipt, account, actor = $bindable('') }: Props = $props()

  function onadd(identities: string[], group?: string) {
    void add(receipt.id, identities, group)
  }

  function ondone() {
    if (actor !== account.id) transit(() => (actor = account.id))
  }
</script>

{#if receipt.status !== 'sealed'}
  <Actions>
    {#if receipt.locked}
      {#if receipt.locker === account.id}
        <Unlock {receipt} />
      {/if}
    {:else}
      <Participants.Button
        class={[
          actionVariants({ variant: receipt.identities.length === 1 ? 'default' : 'secondary' }),
        ]}
        exclude={receipt.identities}
        options={{ shareUrl: `/join/receipts/${receipt.id}/` }}
        {onadd}>
        <UserPlus />
      </Participants.Button>
      <Done
        {receipt}
        {actor}
        {ondone}
        variant={receipt.identities.length === 1 || receipt.done[actor] === true
          ? 'secondary'
          : 'default'} />
    {/if}
  </Actions>
{/if}
