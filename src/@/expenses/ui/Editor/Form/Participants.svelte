<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { Plus } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { dict, locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { Button } from '$ui/button'
  import * as Card from '$ui/card'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { account as me } from '@/iam'
  import Amount from './Amount.svelte'
  import { getContext } from './Context'
  import type { Props } from './Participants'

  const nameClass = 'text-start text-base font-normal flex-1 min-w-0 flex'
  const amountClass = 'min-w-24 max-w-28 flex-1'

  const { value = $bindable() }: Props = $props()
  const ctx = getContext()
  const total = $derived(ctx.total)
  const paid = $derived(ctx.paid)
  const overpayment = $derived(Math.max(paid - total, 0))
</script>

<Section class="flex flex-col gap-1.5">
  <h2>{$dict.expenses.spendings.title}</h2>

  <Card.Root class="bg-background p-4">
    <Card.Content class="space-y-2 p-0">
      {#each Object.keys(value.participants) as id, i (id)}
        {#if i > 0}
          <Separator />
        {/if}
        <div class="flex flex-nowrap items-center justify-between gap-2">
          <!-- <div class="flex items-center gap-2 overflow-hidden flex-1"> -->
          <Async store={accounts.get(id)} class="flex items-center gap-2 overflow-hidden flex-1">
            {#snippet awaited(account)}
              {@const name = id === $me?.id ? $dict.expenses.me : account.name}
              <div class="shrink-0">
                <Picture {account} class="size-8" />
              </div>
              <div class={nameClass}>
                <TextEllipsis>{name}</TextEllipsis>
              </div>
            {/snippet}
          </Async>
          <!-- </div> -->
          <Amount class={amountClass} bind:value={value.participants[id].amount} />
        </div>
      {/each}

      <div class="py-2">
        <Button
          id="expenses-spendings-add-participants-button"
          size="lg"
          variant="secondary"
          class="w-full"
          href="participants/"
        >
          <Plus />
          {$dict.expenses.participants.add.label}
        </Button>
      </div>

      {#each value.extras as extra, i (i)}
        {#if i > 0}
          <Separator />
        {/if}
        <div class="flex flex-col gap-2">
          <div class="flex flex-nowrap items-center justify-between gap-2">
            <div class="flex items-center gap-2 overflow-hidden flex-1">
              <div class={nameClass}>
                <TextEllipsis>
                  {extra.comment ?? $dict.expenses.spendings.extras.title}
                </TextEllipsis>
              </div>
            </div>
            <Amount
              class={amountClass}
              bind:value={value.extras[i].amount}
              placeholder={currency(overpayment, $locale)}
            />
          </div>
          {#if i === 0}
            <div class="text-sm text-muted-foreground">
              {$dict.expenses.spendings.extras.description}
            </div>
          {/if}
        </div>
      {/each}

      <Separator />
      <div class="flex items-center justify-between gap-2 min-h-12">
        <span>{$dict.expenses.spendings.total}</span>
        <div class="flex items-center gap-2">
          <span class="text-3xl font-bold">
            {currency(total, $locale)}
          </span>
          <Coins class="text-muted-foreground" size={16} />
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</Section>
