<script lang="ts">
  import { onMount } from 'svelte'
  import { add } from '@/purchases'
  import { Button } from '$ui/button'
  import { image } from '$lib/tools'
  import { dict as common } from '$lib/intl'
  import { Scrollable } from '$com/scrollable'
  import { dict } from './intl'
  import { benefits } from './Offer'
  import { assets } from './Complete'
  import Benefit from './Benefit.svelte'
  import type { Props } from './Offer'

  const { next }: Props = $props()

  let busy = $state(false)
  const price = '€19.99'

  async function onclick() {
    busy = true

    const result = await add()

    busy = false

    if (result instanceof Error) return

    next()
  }

  onMount(() => image.preload(assets))
</script>

<p>{$dict.paywall.offer.headline}</p>
<Scrollable class="gap-2" bleed scroll={0} align="center">
  {#each benefits as benefit (benefit.id)}
    <Benefit {benefit} class="w-full snap-center" />
  {/each}
</Scrollable>
<p>{$dict.paywall.offer.promo}</p>
<div>
  <Button {onclick} size="lg" class="w-full" disabled={busy}>{$dict.paywall.offer.cta}</Button>
  <p class="text-sm text-muted-foreground text-center">
    {$dict.paywall.offer.trial(price)}
  </p>
</div>
<div class="text-sm **:text-muted-foreground text-center space-y-2">
  <p>{$dict.paywall.offer.disclaimer}</p>
  <p>{$dict.paywall.offer.footnote}</p>
  <p>
    <a href="/terms/">{$common.terms}</a>
    <span aria-hidden="true">·</span>
    <a href="/privacy/">{$common.privacy}</a>
  </p>
</div>
