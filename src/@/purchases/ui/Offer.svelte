<script lang="ts">
  import { onMount } from 'svelte'
  import { add, channel } from '@/purchases'
  import { Spinner } from '$ui/spinner'
  import { Button } from '$ui/button'
  import { image } from '$lib/tools'
  import { dict as common } from '$lib/intl'
  import { features } from '$config'
  import { Scrollable } from '$com/scrollable'
  import { dict } from './intl'
  import { Products } from './Products'
  import { benefits } from './Offer'
  import { assets } from './Complete'
  import Benefit from './Benefit.svelte'
  import type { Product } from '@/purchases'
  import type { Props } from './Offer'

  const { next }: Props = $props()

  let busy = $state(false)
  let products = $state<Product[]>([])
  let loaded = $state<boolean>(true)

  const yearly = $derived(products.find((p) => p.period === 'P1Y'))

  async function onclick() {
    busy = true

    const result = await add()

    busy = false

    if (result instanceof Error) return

    next?.()
  }

  async function load() {
    const ch = channel()

    if (ch === null) return

    if (!(await ch.available())) return

    const r = await ch.products()

    if (r instanceof Error) return

    products = r
  }

  onMount(() => {
    image.preload(assets)
    void load().then(() => (loaded = true))
  })
</script>

<div class="flex flex-col justify-between h-full gap-4">
  <Scrollable class="gap-2" bleed scroll={0} align="center">
    {#each benefits as benefit (benefit.id)}
      <Benefit {benefit} class="w-full snap-center" />
    {/each}
  </Scrollable>
  {#if loaded}
    {#if products.length > 0}
      <Products {products} />
    {/if}
    <div class="space-y-2 flex flex-col justify-between">
      <div class="rounded-lg ring-3 ring-primary/20">
        <Button {onclick} size="lg" class="w-full relative" disabled={busy}>
          {#if features.purchase}
            {$dict.paywall.offer.cta}
          {:else}
            {$dict.paywall.free.cta}
          {/if}
        </Button>
      </div>
      <p class="text-sm text-muted-foreground text-center">
        {#if features.purchase && yearly}
          {$dict.paywall.offer.trial(yearly.displayPrice)}
        {:else if !features.purchase}
          {$dict.paywall.offer.promo}
        {/if}
      </p>
    </div>
    {#if features.purchase}
      <div class="text-sm **:text-muted-foreground text-center space-y-2">
        <p>{$dict.paywall.offer.disclaimer}</p>
        <p>{$dict.paywall.offer.footnote}</p>
        <p>
          <a href="/terms/">{$common.terms}</a>
          <span aria-hidden="true">·</span>
          <a href="/privacy/">{$common.privacy}</a>
        </p>
      </div>
    {/if}
  {:else}
    <div class="flex items-center justify-center py-8">
      <Spinner />
    </div>
  {/if}
</div>
