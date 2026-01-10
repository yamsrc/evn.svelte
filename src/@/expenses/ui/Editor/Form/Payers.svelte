<script lang="ts">
  import { Async } from 'svas'
  import { dict, locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Progress } from '$ui/progress'
  import { Section } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { account as me } from '@/iam'
  import { getContext } from './Context'
  import Payer from './Payer.svelte'
  import type { Props } from './Payers'

  const { value = $bindable() }: Props = $props()

  function ontoggle() {
    console.log(payers.length, total)
  }

  const ctx = getContext()
  const payers = $derived(ctx.payers)
  const total = $derived(ctx.total)
  const paid = $derived(ctx.paid)
  const overpaid = $derived(ctx.overpaid)
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    <Section class="flex flex-col gap-1.5" id="expenses-payers-list">
      <div class="flex justify-between items-center">
        <h2>{$dict.expenses.payers.title}</h2>
        <div class="w-32 text-right space-y-1">
          <span class={cn('text-xs text-muted-foreground', overpaid > 0 && 'text-primary')}>
            {currency(paid, $locale)}
          </span>
          <Progress
            value={paid - overpaid}
            max={total + overpaid}
            class={cn(
              'h-1 transition-opacity [&_div[data-slot=progress-indicator]]:bg-constructive',
              overpaid === 0 ? 'bg-constructive/20' : 'bg-primary',
              payers.length > 1 ? 'opacity-100' : 'opacity-0',
            )}
          />
        </div>
      </div>
      <div id="expenses-payers-list-content" class="flex flex-col gap-1.5">
        {#each Object.keys(value.participants) as identity (identity)}
          {#if identity === $me?.id}
            <Payer bind:participant={value.participants[identity]} {ontoggle} />
          {:else}
            {@const contact = contacts.find((c) => c.identity === identity)}
            {#if contact}
              <Payer bind:participant={value.participants[identity]} {contact} {ontoggle} />
            {/if}
          {/if}
        {/each}
      </div>
    </Section>
  {/snippet}
</Async>
