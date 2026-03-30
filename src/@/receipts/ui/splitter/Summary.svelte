<script lang="ts">
  import { Coins } from '@/app/ui'
  import { Separator } from '$ui/separator'
  import * as Item from '$ui/item'
  import { Fraction } from '$com/text'
  import { dict } from '../intl'
  import { store } from './store'
  import { summarize, type Props } from './Summary'

  const { actor }: Props = $props()
  const lines = $derived(summarize($store, actor))
  const total = $derived(lines.reduce((acc, line) => acc + line.price, 0))
</script>

<Item.Root class={['bg-constructive/20! border-constructive/30!']}>
  <Item.Content class="space-y-2">
    <ul class="space-y-2">
      {#each lines as line, i (i)}
        <li class="flex justify-between">
          <div>
            <span class="min-w-4 inline-block text-center text-sm font-medium">
              {#if line.denominator > 1}
                <Fraction numerator={line.numerator} denominator={line.denominator} />
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
    <div class="flex justify-between">
      <span class="font-medium">{$dict.overview.total}</span>
      <Coins amount={total} sign="neutral" />
    </div>
  </Item.Content>
</Item.Root>
