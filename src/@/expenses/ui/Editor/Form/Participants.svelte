<script lang="ts">
  import { dict } from '@/expenses/ui/intl'
  import { numbers, type Participant } from '@/expenses'
  import { Participants } from '@/app/ui'
  import * as Tabs from '$ui/tabs'
  import * as Card from '$ui/card'
  import BySum from './BySum.svelte'
  import ByShare from './ByShare.svelte'
  import type { Props } from './Participants'

  let { value = $bindable(), error = $bindable(false), mode = $bindable('sums') }: Props = $props()

  const exclude = $derived(Object.keys(value.participants))

  function onadd(identities: string[]) {
    const existing = Object.keys(value.participants)
    const even = existing.length > 0 && numbers.even(value.participants, existing)
    const total = numbers.total(value)

    const added: Record<string, Participant> = Object.fromEntries(
      identities
        .filter((id) => !(id in value.participants))
        .map((id) => [id, { amount: 0, shares: 0 }]),
    )

    value.participants = { ...value.participants, ...added }

    if (even && total > 0) {
      const split = numbers.split(total, Object.keys(value.participants))

      for (const [id, amount] of Object.entries(split)) value.participants[id].amount = amount
    }
  }
</script>

<Card.Root class={['bg-background p-4 relative', { shake: error }]}>
  <Card.Content class="space-y-4 p-0">
    <Tabs.Root bind:value={mode} class="w-full">
      <Tabs.List class="w-full h-12">
        <Tabs.Trigger id="expenses-participants-tabs-sums" value="sums" class="text-base">
          {$dict.participants.tabs.sums}
        </Tabs.Trigger>
        <Tabs.Trigger id="expenses-participants-tabs-shares" value="shares" class="text-base">
          {$dict.participants.tabs.shares}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="sums">
        <BySum bind:value />
      </Tabs.Content>
      <Tabs.Content value="shares">
        <ByShare bind:value />
      </Tabs.Content>
    </Tabs.Root>
    <Participants.Add
      id="expenses-spendings-add-participants-button"
      {exclude}
      {onadd}
      options={{ managedContactsCreation: true }}
      class="w-full" />
  </Card.Content>
</Card.Root>

<style>
  :global(.shake) {
    animation: shake 0.6s ease-in-out;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    10% {
      transform: translateX(-12px);
    }
    20% {
      transform: translateX(12px);
    }
    30% {
      transform: translateX(-8px);
    }
    40% {
      transform: translateX(8px);
    }
    50% {
      transform: translateX(-4px);
    }
    60% {
      transform: translateX(4px);
    }
    70% {
      transform: translateX(-2px);
    }
    80% {
      transform: translateX(2px);
    }
    90% {
      transform: translateX(-1px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
