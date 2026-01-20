<script lang="ts">
  import { locale } from '$lib/intl'
  import { currency, unit } from '$lib/tools'
  import { cn } from '$lib/utils'
  import * as InputGroup from '$ui/input-group'
  import { Coins } from '@/app/ui'
  import type { Props } from './Amount'

  let {
    value = $bindable(),
    placeholder = '0',
    oninput: oninputCb,
    class: classes,
    inputClass,
    id,
    sign,
  }: Props = $props()

  function oninput(e: Event) {
    const val = (e.target as HTMLInputElement)?.value
    const amount = val ? unit(Number(val), $locale) : 0

    value = amount

    oninputCb?.(amount)
  }
</script>

<InputGroup.Root class={cn('bg-input border border-border h-full px-1', classes)}>
  <InputGroup.Input
    {id}
    {placeholder}
    type="number"
    value={value !== undefined && value > 0 ? currency(value, $locale) : null}
    {oninput}
    min={0}
    step="0.01"
    class={inputClass} />
  <InputGroup.Addon align="inline-end">
    <Coins {sign} />
  </InputGroup.Addon>
</InputGroup.Root>
