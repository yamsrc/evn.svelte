<script lang="ts">
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
</script>

<div class="space-y-4">
  <Participants bind:this={participants} {receipt} {account} bind:actor />
  <Items {receipt} {actor} />
</div>

<Actions {receipt} />
