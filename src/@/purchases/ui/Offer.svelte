<script lang="ts">
  // this file needs serious refactoring

  import { onMount } from 'svelte'
  import { ok } from 'svas'
  import { add, channel } from '@/purchases'
  import { account } from '@/iam'
  import { Spinner } from '$ui/spinner'
  import { Button } from '$ui/button'
  import { image, ios, shell } from '$lib/tools'
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
  let loaded = $state<boolean>(false)
  let selected = $state<Product | null>(null)

  async function onclick() {
    if (products.length !== 0 && selected === null) return

    busy = true

    const method = (() => {
      if (products.length === 0) return freePurchase
      else return paidPurchase
    })()

    const result = await method()

    busy = false

    if (result instanceof Error) console.error(result)
    else next?.()
  }

  async function freePurchase() {
    return await add()
  }

  async function paidPurchase() {
    if (selected === null || !ok(account)) return new Error('no-account or not-selected')

    const ch = channel()

    if (ch === null) return new Error('no-channel')

    return await ch.purchase(selected.id, $account!.id)
  }

  async function restorePurchases(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement

    button.disabled = true

    const ch = channel()

    if (ch?.kind === 'apple') await ch.restore()

    button.disabled = false
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

    if (features.purchase) void load().then(() => (loaded = true))
    else loaded = true
  })
</script>

<div class="flex flex-col justify-between h-full gap-4">
  <Scrollable class="gap-2" bleed scroll={0} align="center">
    {#each benefits as benefit (benefit.id)}
      <Benefit {benefit} class="w-full snap-center" />
    {/each}
  </Scrollable>
  {#if loaded}
    {@const free = products.length === 0}
    {#if !free}
      <Products {products} bind:selected />
    {/if}
    <div class="space-y-2 flex flex-col justify-between">
      <div class="rounded-lg ring-3 ring-primary/20">
        <Button {onclick} size="lg" class="w-full relative" disabled={busy}>
          {#if busy}
            <Spinner />
          {:else if free}
            {$dict.paywall.free.cta}
          {:else if selected?.trial}
            {$dict.paywall.offer.trial.cta}
          {:else}
            {$dict.paywall.offer.subscribe_monthly(selected?.displayPrice)}
          {/if}
        </Button>
      </div>
      <p class="text-sm text-muted-foreground text-center">
        {#if !free && selected?.trial}
          {$dict.paywall.offer.trial.comment(selected.displayPrice)}
        {:else if free}
          {$dict.paywall.offer.promo}
        {/if}
      </p>
    </div>
    {#if !free}
      <div class="text-sm **:text-muted-foreground text-center space-y-2">
        <p>
          {#if selected?.trial}
            {$dict.disclaimers.trial}
          {/if}
          {#if shell && ios}
            {$dict.disclaimers.apple_account}
            {#if selected?.period === 'P1Y'}
              {$dict.disclaimers.apple_yearly(selected?.displayPrice)}
            {:else if selected?.period === 'P1M'}
              {$dict.disclaimers.apple_monthly(selected?.displayPrice)}
            {/if}
            {$dict.disclaimers.apple_manage}
          {/if}
        </p>
        <p>
          <a href="/terms/">{$common.terms}</a>
          <span aria-hidden="true">·</span>
          <a href="/privacy/">{$common.privacy}</a>
        </p>
        <div>
          <Button
            onclick={restorePurchases}
            size="sm"
            variant="outline"
            class="disabled:[&_span]:hidden [&_svg]:hidden disabled:[&_svg]:block">
            <span>{$dict.restore.label}</span>
            <Spinner />
          </Button>
        </div>
      </div>
    {/if}
  {:else}
    <div class="flex items-center justify-center py-8">
      <Spinner />
    </div>
  {/if}
</div>
