<script lang="ts">
  import { UserPlus } from '@lucide/svelte'
  import { add } from '@/receipts/svc/add'
  import { Participants, actionVariants } from '@/app/ui'
  import { Actions } from '$com/shell'
  import Done from './Done.svelte'
  import type { Props } from './Actions'

  const { receipt, actor }: Props = $props()

  function onadd(identities: string[]) {
    void add(receipt.id, identities)
  }
</script>

<Actions>
  <!--
  do not remove this condition
  receipt is undefined somehow before navigation
  -->
  {#if receipt?.identities !== undefined}
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
      variant={receipt.identities.length === 1 || receipt.done[actor] === true
        ? 'secondary'
        : 'default'} />
  {/if}
</Actions>
