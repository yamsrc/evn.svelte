<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Separator } from '$com/separator'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { dict, locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { cn } from '$lib/utils'
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

  const { value = $bindable(), error = $bindable(false) }: Props = $props()
  const ctx = getContext()
  const paid = $derived(ctx.paid)
  const total = $derived(ctx.total)
  const overpayment = $derived(Math.max(paid - total, 0))

  const participants = $derived(Object.keys(value.participants))
</script>

<Section class={cn('flex flex-col gap-1.5 -mt-3', { shake: error })}>
  <Card.Root class="bg-background p-4 relative">
    <div
      class="absolute -top-[0.4rem] right-4 size-3 bg-background border-t border-r border-border -rotate-45">
    </div>
    <Card.Content class="space-y-2 p-0">
      <!-- Participants -->
      {#each participants as id, i (id)}
        {#if i > 0}
          <Separator />
        {/if}
        <div class="flex flex-nowrap items-center justify-between gap-2">
          <div class="flex items-center gap-2 overflow-hidden flex-1">
            <Async store={accounts.get(id)}>
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
          </div>
          <Amount
            id={`expenses-participant-amount-${i}`}
            class={amountClass}
            bind:value={value.participants[id].amount} />
        </div>
      {/each}

      <div class="py-2">
        <Button
          id="expenses-spendings-add-participants-button"
          size="lg"
          variant="secondary"
          class="w-full"
          href="participants/">
          <Plus />
          {$dict.expenses.participants.add.label}
        </Button>
      </div>

      <!-- Extras -->
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
              placeholder={i === value.extras.length - 1 ? currency(overpayment, $locale) : '0'} />
          </div>
          {#if i === 0}
            <div class="text-sm text-muted-foreground">
              {$dict.expenses.spendings.extras.description}
            </div>
          {/if}
        </div>
      {/each}
    </Card.Content>
  </Card.Root>
</Section>

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
