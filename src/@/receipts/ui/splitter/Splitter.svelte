<script lang="ts">
  import Participants from './Participants.svelte'
  import Items from './Items.svelte'
  import Actions from './Actions.svelte'
  import type { Props } from './Splitter'

  const { receipt, account }: Props = $props()

  // svelte-ignore state_referenced_locally
  let actor = $state(account.id)
</script>

<div class="space-y-4">
  <Participants {receipt} {account} bind:actor />
  <Items {receipt} {actor} />
</div>

<Actions {receipt} />
