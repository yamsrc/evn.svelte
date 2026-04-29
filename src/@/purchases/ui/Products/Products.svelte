<script lang="ts">
  import * as RadioGroup from '$ui/radio-group'
  import * as Item from '$ui/item'
  import { Badge } from '$ui/badge'
  import { currency, formatISODuration } from '$lib/tools'
  import { locale } from '$lib/intl'
  import { dict } from '../intl'
  import { ids, type Props } from './Products'
  import type { Product } from '@/purchases'

  const { products }: Props = $props()
  const known = $derived(products.filter((p) => ids.includes(p.id)))
  const sorted = $derived(known.toSorted((a) => (a.id === 'premium_yearly' ? -1 : 1)))

  let value = $state<Product['id']>('premium_yearly')
</script>

<RadioGroup.Root bind:value>
  {#each sorted as product (product.id)}
    {@const selected = product.id === value}
    {@const price = Number.parseFloat(product.priceString)}
    <label>
      <Item.Root class={['relative transition-all', selected && 'selected']}>
        <Item.Media>
          <RadioGroup.Item value={product.id} />
        </Item.Media>
        <Item.Content>
          <Item.Title>
            {#if product.id === 'premium_yearly'}
              {@const pms = currency((price * 100) / 12, $locale, product.currencyCode)}
              <span class="font-semibold">{$dict.products.yearly.title}</span>
              <span class="font-normal">{$dict.permonth(pms)}</span>
            {:else if product.id === 'premium_monthly'}
              {@const pms = currency(price * 100, $locale, product.currencyCode)}
              {$dict.products.monthly.title}
              <span class="font-normal">{$dict.permonth(pms)}</span>
            {/if}
          </Item.Title>
          <Item.Description class="text-sm">
            {#if product.id === 'premium_yearly'}
              {$dict.products.yearly.description(product.displayPrice)}
            {:else if product.id === 'premium_monthly'}
              {$dict.products.monthly.description}
            {/if}
          </Item.Description>
        </Item.Content>
        {#if product.trial}
          {@const duration = formatISODuration(product.trial.period, $locale)}
          <Badge
            class="text-sm font-semibold text-nowrap absolute -top-3 right-4 transition-all"
            variant={selected ? 'default' : 'secondary'}>
            {$dict.trial(duration)}
          </Badge>
        {/if}
      </Item.Root>
    </label>
  {/each}
</RadioGroup.Root>
