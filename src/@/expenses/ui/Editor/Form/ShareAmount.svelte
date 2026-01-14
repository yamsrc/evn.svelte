<script lang="ts">
  import { Coins, Minus, Plus } from '@lucide/svelte'
  import { locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import * as ButtonGroup from '$ui/button-group'
  import type { Props } from './ShareAmount'

  let { amount = 0, share = $bindable(), min = 0, max = 5, class: classes, id }: Props = $props()

  function decrement() {
    share = Math.max(min, share - 1)
  }

  function increment() {
    share += 1
  }
</script>

<div class={cn('flex items-center justify-end gap-2', classes)}>
  <div {id} class="h-full flex items-center justify-between gap-2 min-h-9 relative">
    <span>{amount > 0 ? currency(amount, $locale) : '0'}</span>
    <Coins class="text-muted-foreground size-4" />
    <div class="flex justify-end gap-0.5 absolute -bottom-1 right-0">
      {#each Array(Math.max(min, Math.min(share, max))) as _, i (i)}
        <div class="size-1 rounded-full bg-constructive"></div>
      {/each}
    </div>
  </div>
  <ButtonGroup.Root>
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      onclick={decrement}
      disabled={share <= min}>
      <Minus />
    </Button>
    <Button type="button" variant="outline" size="icon-sm" onclick={increment}>
      <Plus />
    </Button>
  </ButtonGroup.Root>
</div>
