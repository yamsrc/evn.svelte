<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import * as InputGroup from '$ui/input-group'
  import { cn } from '$lib/utils'
  import { currency, unit } from '$lib/tools'
  import { locale } from '$lib/intl'
  import type { Props } from './CoinsInput'

  let {
    id,
    value = $bindable(),
    placeholder = '0',
    autofocus,
    oninput: callback,
    class: classes,
    inputClass,
  }: Props = $props()

  function oninput(e: Event) {
    const val = (e.target as HTMLInputElement)?.value
    const amount = val ? unit(Number(val), $locale) : 0

    value = amount

    callback?.(amount)
  }
</script>

<InputGroup.Root class={cn('bg-input border border-border h-full px-1', classes)}>
  <InputGroup.Input
    {id}
    {placeholder}
    {autofocus}
    type="number"
    value={value !== undefined && value > 0 ? currency(value, $locale) : null}
    {oninput}
    min={0}
    step="0.01"
    class={cn('text-right', inputClass)} />
  <InputGroup.Addon align="inline-end">
    <Coins />
  </InputGroup.Addon>
</InputGroup.Root>
