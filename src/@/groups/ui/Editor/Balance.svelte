<script lang="ts">
  import { ok } from 'svas'
  import { account } from '@/iam'
  import { contacts } from '@/contacts'
  import { Coins } from '@/app/ui'
  import { dict } from '$lib/intl'
  import type { Props } from './Balance'

  const { value }: Props = $props()

  const identities = $derived(value.identities.filter((id) => id !== $account?.id) ?? [])

  const calc = (balances: number[]) => Math.abs(balances.reduce((acc, b) => acc + b, 0))

  const balance = $derived.by(() => {
    if (!ok($contacts)) return { from: 0, to: 0 }

    const balances = identities.map(
      (id) => $contacts.find(({ identity }) => identity === id)?.balance ?? 0,
    )

    return {
      from: calc(balances.filter((b) => b > 0)),
      to: calc(balances.filter((b) => b < 0)),
    }
  })
</script>

<div class="space-y-2 flex flex-col items-center">
  {#if balance.from === 0 && balance.to === 0}
    <div>{$dict.groups.summary.balance.even}</div>
  {:else}
    {#if balance.from > 0}
      <div class="flex items-center gap-2">
        <div>{$dict.groups.summary.balance.from}</div>
        <Coins amount={balance.from} />
      </div>
    {/if}
    {#if balance.to > 0}
      <div class="flex items-center gap-2">
        <span>{$dict.groups.summary.balance.to}</span>
        <Coins amount={balance.to} sign="negative" />
      </div>
    {/if}
  {/if}
</div>
