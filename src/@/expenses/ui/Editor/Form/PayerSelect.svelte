<script lang="ts">
  import { Async } from 'svas'
  import { dict } from '$lib/intl'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { dict as expensesDict } from '@/expenses/ui/intl'
  import { account as me } from '@/iam'
  import { getContext } from './Context'
  import type { Props } from './PayerSelect'

  const { value = $bindable() }: Props = $props()
  const ctx = getContext()
  const total = $derived(ctx.total)

  const payerId = $derived(
    Object.keys(value.participants).find((id) => value.participants[id].paid !== undefined),
  )

  function onValueChange(id: string | undefined) {
    // Clear all paid values
    for (const participantId of Object.keys(value.participants))
      if (value.participants[participantId].paid !== undefined)
        delete value.participants[participantId].paid

    // Set selected payer's paid to total
    if (id !== undefined) value.participants[id].paid = total
  }
</script>

<Section class="flex flex-col gap-1.5">
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
    <SelectContent>
      {#each Object.keys(value.participants) as id (id)}
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
</Section>
