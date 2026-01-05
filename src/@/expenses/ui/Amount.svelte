<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { currency, unit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import * as InputGroup from '$ui/input-group'
  import type { Props } from './Amount'

  let { value = $bindable(), oninput: oninputCb, class: classes }: Props = $props()

  function oninput(e: Event) {
    const val = (e.target as HTMLInputElement)?.value
    const amount = val ? unit(Number(val)) : 0

    value = amount

    oninputCb?.(amount)
  }
</script>

<InputGroup.Root class={cn('bg-input border border-border h-full', classes)}>
  <InputGroup.Input
    placeholder="0"
    type="number"
    value={value > 0 ? currency(value) : null}
    {oninput}
    min={0}
    step="0.01"
  />
  <InputGroup.Addon align="inline-end">
    <Coins />
  </InputGroup.Addon>
</InputGroup.Root>
