<script lang="ts">
  import { Async } from 'svas'
  import { account as me } from '@/iam'
  import { dict as expensesDict } from '@/expenses/ui/intl'
  import { Avatar, Title } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { dict } from '$lib/intl'
  import type { Props } from './PayerSelect'

  let {
    value = $bindable(),
    identities,
    disabled = false,
    onchange,
    id = 'expenses-payer-select-trigger',
    class: classes,
  }: Props = $props()

  function onValueChange(v: string | undefined) {
    value = v
    onchange?.(v)
  }
</script>

<Select type="single" {value} {onValueChange} {disabled}>
  {#if value}
    <Async store={accounts.get(value)}>
      {#snippet awaited(account)}
        {@const name = account.id === $me?.id ? $dict.expenses.me : account.name}
        <SelectTrigger {id} class={['w-full', classes]}>
          <div class="flex items-center gap-2">
            <Avatar {account} class="size-6" />
            <Title account={{ ...account, name }} />
          </div>
        </SelectTrigger>
      {/snippet}
    </Async>
  {:else}
    <SelectTrigger {id} class={['w-full', classes]}>
      <span class="text-muted-foreground">{$expensesDict.payer.placeholder}</span>
    </SelectTrigger>
  {/if}
  <SelectContent collisionPadding={{ top: 64, bottom: 88 }}>
    {#each identities as identity (identity)}
      <Async store={accounts.get(identity)}>
        {#snippet awaited(account)}
          {@const name = identity === $me?.id ? $dict.expenses.me : account.name}
          <SelectItem value={identity}>
            <div class="flex items-center gap-2">
              <Avatar {account} class="size-6" />
              <Title account={{ ...account, name }} />
            </div>
          </SelectItem>
        {/snippet}
      </Async>
    {/each}
  </SelectContent>
</Select>
