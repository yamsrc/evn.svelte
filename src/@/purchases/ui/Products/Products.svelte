<script lang="ts">
  import { untrack } from 'svelte'
  import * as RadioGroup from '$ui/radio-group'
  import * as Item from '$ui/item'
  import { Badge } from '$ui/badge'
  import { currency, formatISODuration } from '$lib/tools'
  import { locale } from '$lib/intl'
  import { dict } from '../intl'
  import { plans, sort, permonth, featured, type Props } from './Products'

  let { products, selected = $bindable(null), disabled = false }: Props = $props()

  // one-time default: products is non-empty and stable for this component's lifetime
  // (parent mounts <Products> only when loaded && !free)
  selected ??= untrack(() => featured(products))

  const sorted = $derived(sort(products))

  function select(plan: string) {
    selected = products.find((p) => p.plan === plan) ?? selected
  }
</script>

<RadioGroup.Root id="purchases-products" value={selected?.plan} onValueChange={select}>
  {#each sorted as product (product.id)}
    {@const cfg = plans[product.plan]}
    {@const active = product.plan === selected?.plan}
    {@const pms =
      (cfg.approx ? '≈ ' : '') + currency(permonth(product), $locale, product.currencyCode)}
    <label id="purchases-plan-{product.plan}">
      <Item.Root
        class={['relative transition-all', active && 'selected', disabled && 'opacity-50']}>
        <Item.Media>
          <RadioGroup.Item value={product.plan} {disabled} />
        </Item.Media>
        <Item.Content>
          <Item.Title>
            <span class={[cfg.featured && 'font-semibold']}>{$dict.products[product.plan].title}</span>
            <span class="font-normal">{$dict.permonth(pms)}</span>
          </Item.Title>
          <Item.Description class="text-sm">
            {#if product.plan === 'yearly'}
              {$dict.products.yearly.description(product.displayPrice)}
            {:else}
              {$dict.products.monthly.description}
            {/if}
          </Item.Description>
        </Item.Content>
        {#if product.trial}
          {@const duration = formatISODuration(product.trial.period, $locale)}
          <Badge
            class={[
              'text-sm font-semibold text-nowrap absolute -top-3 inset-e-4 transition-all',
              active || 'text-muted-foreground/25',
            ]}
            variant={active ? 'default' : 'secondary'}>
            {$dict.trial(duration)}
          </Badge>
        {/if}
      </Item.Root>
    </label>
  {/each}
</RadioGroup.Root>
