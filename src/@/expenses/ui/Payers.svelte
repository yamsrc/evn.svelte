<script lang="ts">
  import { Async, combined } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { accounts } from '@/accounts'
  import { contacts } from '@/contacts'
  import Payer from './Payer.svelte'
  import type { Props } from './Payers'
  import type { Participant } from '@/expenses'

  let { participants = $bindable<Record<string, Participant>>({}) }: Props = $props()

  const selection = new SvelteSet<string>(
    Object.entries(participants)
      .filter(([_, participant]) => (participant.paid ?? 0) > 0)
      .map(([identity]) => identity),
  )

  const partial = $derived(selection.size > 1)

  let total = $state(0)

  function updateTotal() {
    total = Object.values(participants).reduce((acc, participant) => acc + participant.amount, 0)
  }

  function update() {
    updateTotal()

    participants = {
      ...participants,
      ...Object.fromEntries(
        Object.entries(participants).map(([identity, participant]) => {
          if (selection.has(identity) && !partial) participant.paid = total
          else if (!selection.has(identity)) participant.paid = 0

          return [identity, participant]
        }),
      ),
    }
  }

  function onselect(identity: string, selected: boolean) {
    if (selected) selection.add(identity)
    else selection.delete(identity)

    update()
  }

  function onchange(identity: string, paid: number) {
    participants = {
      ...participants,
      [identity]: {
        ...participants[identity],
        paid,
      },
    }

    update()
  }

  $effect.pre(() => updateTotal())
</script>

<div class="flex flex-col gap-1.5">
  {#each Object.entries(participants) as [identity, participant] (identity)}
    <Async store={combined(accounts.get(identity), contacts)}>
      {#snippet awaited([account, contacts])}
        {@const contact = contacts.find((c) => c.identity === identity)}
        {@const selected = selection?.has(identity)}
        <Payer {participant} {account} {contact} {partial} {selected} {onselect} {onchange} />
      {/snippet}
    </Async>
  {/each}
</div>
