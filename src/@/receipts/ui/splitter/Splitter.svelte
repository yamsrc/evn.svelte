<script lang="ts">
  import Failed from '../Failed.svelte'
  import { sync } from './store'
  import Summary from './Summary.svelte'
  import Progress from './Progress.svelte'
  import Pending from './Pending.svelte'
  import Participants from './Participants.svelte'
  import Lock from './Lock.svelte'
  import { allDone } from './Lock'
  import Items from './Items.svelte'
  import Feedback from './Feedback.svelte'
  import Extras from './Extras.svelte'
  import Autoclose from './Autoclose.svelte'
  import Actions from './Actions.svelte'
  import type { Props } from './Splitter'

  let { receipt, account, actor = $bindable(account.id) }: Props = $props()

  // let actor = $state(account.id)

  export function leave() {
    return participants?.remove()
  }

  let participants = $state<Participants | undefined>(undefined)

  $effect(() => {
    sync(receipt)

    if (!receipt.identities.includes(actor)) actor = account.id
  })
</script>

<div class="space-y-2">
  {#if receipt.status !== 'failed'}
    <div class={['z-10 sticky top-4 tim:top-[env(safe-area-inset-top)]', 'space-y-2']}>
      <Progress />
      <Participants bind:this={participants} {receipt} {account} bind:actor />
    </div>
  {/if}
  {#if receipt.status === 'pending'}
    <Pending />
  {:else if receipt.status === 'failed'}
    <Failed />
  {:else if receipt.done[actor] === true}
    <div class="space-y-4 pt-2">
      <div>
        <Summary {receipt} {actor} />
        {#if receipt.extras.length > 0}
          <Extras {receipt} />
        {/if}
      </div>
      {#if !receipt.locked}
        {#if allDone(receipt)}
          <Lock {receipt} {actor} />
        {:else}
          <Autoclose {receipt} {actor} payer={receipt.autolock} />
        {/if}
        <Feedback {actor} />
      {/if}
    </div>
  {:else}
    <Items {receipt} {actor} />
  {/if}
</div>

{#if receipt.status !== 'failed' && !receipt.locked}
  <Actions {receipt} {actor} />
{/if}
