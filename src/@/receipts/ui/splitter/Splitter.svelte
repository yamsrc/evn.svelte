<script lang="ts">
  import { sync } from './store'
  import Progress from './Progress.svelte'
  import Participants from './Participants.svelte'
  import Items from './Items.svelte'
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
  <div
    class={['z-10 sticky top-4 tim:top-[env(safe-area-inset-top)]', 'space-y-2']}
    style="view-transition-name: splitter-header;">
    <Progress />
    <Participants bind:this={participants} {receipt} {account} bind:actor />
  </div>
  <Items {receipt} {actor} />
</div>

<Actions {receipt} {actor} />
