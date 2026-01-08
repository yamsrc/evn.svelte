<script lang="ts">
  import { Async, combined } from 'svas'
  import { SvelteSet } from 'svelte/reactivity'
  import { dict } from '$lib/intl'
  import { accounts } from '@/accounts'
  import { Section } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { total } from '@/expenses'
  import Payer from './Payer.svelte'
  import type { Props } from './Payers'
  import type { Participant } from '@/expenses'

  let { participants = $bindable<Record<string, Participant>>({}), extras }: Props = $props()

  let participantsRef = participants

  function payers(participants: Record<string, Participant>) {
    return Object.entries(participants)
      .filter(([_, participant]) => (participant.paid ?? 0) > 0)
      .map(([identity]) => identity)
  }

  const selection = new SvelteSet<string>(payers(participants))

  $effect(() => {
    if (participants === participantsRef) return

    participantsRef = participants

    selection.clear()
    for (const identity of payers(participants)) selection.add(identity)
  })

  const split = $derived(selection.size > 1)

  function update() {
    for (const identity of Object.keys(participants))
      if (selection.has(identity) && !split)
        participants[identity].paid = total({ participants, extras })
      else if (!selection.has(identity)) participants[identity].paid = 0
  }

  function onselect(identity: string, selected: boolean) {
    if (selected) selection.add(identity)
    else selection.delete(identity)

    update()
  }
</script>

<Section class="flex flex-col gap-1.5" id="expenses-payers-list">
  <h2>{$dict.expenses.payers.title}</h2>
  <div id="expenses-payers-list-content" class="flex flex-col gap-1.5">
    {#each Object.keys(participants) as identity (identity)}
      <Async store={combined(accounts.get(identity), contacts)} class="expenses-payer">
        {#snippet awaited([account, contacts])}
          {@const contact = contacts.find((c) => c.identity === identity)}
          {@const selected = selection?.has(identity)}
          <Payer
            bind:participant={participants[identity]}
            {account}
            {contact}
            {split}
            {selected}
            {onselect}
          />
        {/snippet}
      </Async>
    {/each}
  </div>
</Section>
