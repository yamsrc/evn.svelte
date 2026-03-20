<script lang="ts">
  import { Async } from 'svas'
  import { account as me } from '@/iam'
  import { dict } from '@/adventures/ui/intl'
  import { Picture } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import type { Props } from './PayerSelect'

  let { payer = $bindable(), members }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.paidBy}</h2>

  <Select type="single" value={payer} onValueChange={(v) => (payer = v)}>
    {#if payer}
      <Async store={accounts.get(payer)}>
        {#snippet awaited(account)}
          <SelectTrigger id="adventures-expense-payer-trigger" class="w-full">
            <div class="flex items-center gap-2">
              <Picture {account} class="size-6" />
              <span>
                {account.id === $me?.id ? $dict.me : account.name}
              </span>
            </div>
          </SelectTrigger>
        {/snippet}
      </Async>
    {:else}
      <SelectTrigger id="adventures-expense-payer-trigger" class="w-full">
        <span class="text-muted-foreground">{$dict.expenses.paidBy}</span>
      </SelectTrigger>
    {/if}
    <SelectContent collisionPadding={{ top: 64, bottom: 88 }}>
      {#each members as mid (mid)}
        <Async store={accounts.get(mid)}>
          {#snippet awaited(account)}
            <SelectItem value={mid}>
              <div class="flex items-center gap-2">
                <Picture {account} class="size-6" />
                <span>
                  {mid === $me?.id ? $dict.me : account.name}
                </span>
              </div>
            </SelectItem>
          {/snippet}
        </Async>
      {/each}
    </SelectContent>
  </Select>
</div>
