<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { currency, unit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import * as InputGroup from '$ui/input-group'
  import type { Props } from './Amount'

  const { value, oninput: oninputCb, class: classes }: Props = $props()

  function oninput(e: Event) {
    const value = (e.target as HTMLInputElement)?.value
    const amount = value ? unit(Number(value)) : 0

    oninputCb(amount)
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
