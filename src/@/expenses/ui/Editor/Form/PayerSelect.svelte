<script lang="ts">
  import { Async } from 'svas'
  import { dict } from '$lib/intl'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { dict as expensesDict } from '@/expenses/ui/intl'
  import { account as me } from '@/iam'
  import { getContext } from './Context'
  import type { Props } from './PayerSelect'

  const { value = $bindable() }: Props = $props()
  const ctx = getContext()
  const total = $derived(ctx.total)
  const identities = $derived(Object.keys(value.participants))

  const payerId = $derived(
    identities.find((id) => value.participants[id].paid !== undefined) ?? identities[0],
  )

  function onValueChange(id: string | undefined) {
    // Clear all paid values
    for (const participantId of identities)
      if (value.participants[participantId].paid !== undefined)
        delete value.participants[participantId].paid

    // Set selected payer's paid to total
    if (id !== undefined) value.participants[id].paid = total
  }
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.payers.title}</h2>

  <Select type="single" value={payerId} {onValueChange}>
    {#if payerId}
      <Async store={accounts.get(payerId)}>
        {#snippet awaited(account)}
          <SelectTrigger id="expenses-payer-select-trigger" class="w-full">
            <div class="flex items-center gap-2">
              <Picture {account} class="size-6" />
              <span>
                {account.id === $me?.id ? $dict.expenses.me : account.name}
              </span>
            </div>
          </SelectTrigger>
        {/snippet}
      </Async>
    {:else}
      <SelectTrigger id="expenses-payer-select-trigger" class="w-full">
        <span class="text-muted-foreground">{$expensesDict.payer.placeholder}</span>
      </SelectTrigger>
    {/if}
    <SelectContent collisionPadding={{ top: 64, bottom: 88 }}>
      {#each identities as id (id)}
        <Async store={accounts.get(id)}>
          {#snippet awaited(account)}
            <SelectItem value={id}>
              <div class="flex items-center gap-2">
                <Picture {account} class="size-6" />
                <span>
                  {id === $me?.id ? $dict.expenses.me : account.name}
                </span>
              </div>
            </SelectItem>
          {/snippet}
        </Async>
      {/each}
    </SelectContent>
  </Select>
</div>
