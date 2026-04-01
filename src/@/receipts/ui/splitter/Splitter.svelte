<script lang="ts">
  import { sync } from './store'
  import Summary from './Summary.svelte'
  import Progress from './Progress.svelte'
  import Participants from './Participants.svelte'
  import Items from './Items.svelte'
  import Feedback from './Feedback.svelte'
  import Autoclose from './Autoclose.svelte'
  import Actions from './Actions.svelte'
  import type { Props } from './Splitter'

  const { receipt, account }: Props = $props()

  // svelte-ignore state_referenced_locally
  let actor = $state(account.id)

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
  <div class={['z-10 sticky top-4 tim:top-[env(safe-area-inset-top)]', 'space-y-2']}>
    <Progress />
    <Participants bind:this={participants} {receipt} {account} bind:actor />
  </div>
  {#if receipt.done[actor] === true}
    <div class="space-y-4 pt-2">
      <Summary {actor} />
      <Autoclose {receipt} {actor} payer={receipt.autolock} />
      <Feedback {actor} />
    </div>
  {:else}
    <Items {receipt} {actor} />
  {/if}
</div>

<Actions {receipt} {actor} />
