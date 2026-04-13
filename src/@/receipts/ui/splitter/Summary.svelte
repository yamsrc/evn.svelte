<script lang="ts">
  import { Coins } from '@/app/ui'
  import { Separator } from '$ui/separator'
  import * as Item from '$ui/item'
  import { transition } from '$lib/tools'
  import { Fraction } from '$com/text'
  import { dict } from '../intl'
  import { store } from './store'
  import { summarize, type Props } from './Summary'
  import Extra from './Extra.svelte'

  const { receipt, stats, actor }: Props = $props()
  const lines = $derived(summarize($store, actor))
  const extras = $derived(receipt.extras.filter((e) => !e.included))
  const portion = $derived(stats.portions[actor].portion)

  const linesCost = $derived(lines.reduce((acc, line) => acc + line.price, 0))
  const extraCost = $derived(extras.reduce((acc, extra) => acc + extra.amount, 0) * portion)
  const total = $derived(linesCost + extraCost)
</script>

<Item.Root class={['bg-constructive/20! border-constructive/30!']}>
  <Item.Content class="space-y-2">
    <ul class="space-y-2">
      {#each lines as line, i (i)}
        <li class="flex justify-between">
          <div class="flex items-start gap-1">
            <span class="min-w-4 inline-block text-center font-medium h-lh">
              {#if line.denominator > 1}
                <Fraction
                  numerator={line.numerator}
                  denominator={line.denominator}
                  class="text-sm" />
              {:else}
                <span>{line.numerator}</span>
              {/if}
            </span>
            <span>{line.item.display}</span>
          </div>
          <span><Coins amount={line.price} sign="neutral" /></span>
        </li>
      {/each}
    </ul>
    <Separator class="bg-foreground/50" />
    <div>
      {#if extras.length > 0}
        {#each extras as extra (extra.id)}
          <Extra {receipt} {extra} {portion} />
        {/each}
      {/if}
      <div
        class="flex justify-between"
        use:transition={{
          name: 'receipt-summary-total',
          classes: 'transition-morph transition-spring',
        }}>
        <span class="font-medium">{$dict.overview.total}</span>
        <Coins amount={total} sign="neutral" />
      </div>
    </div>
  </Item.Content>
</Item.Root>
