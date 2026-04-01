<script lang="ts">
  import { ChartPie } from '@lucide/svelte'
  import { assign } from '@/receipts'
  import { PayerSelect } from '@/expenses/ui'
  import { Switch } from '$ui/switch'
  import * as Item from '$ui/item'
  import { transit } from '$lib/tools'
  import { dict } from '../intl'
  import type { Props } from './Autoclose'

  const { receipt, actor, payer }: Props = $props()

  let transient = $state<string | null | undefined>(undefined)

  const autolock = $derived(transient !== undefined ? transient : (payer ?? null))
  const checked = $derived(autolock !== null)

  let pending = false

  const MAX_ITERATIONS = 5

  function settle(value?: string | null) {
    transit(() => (transient = value))

    if (value === undefined) pending = false
  }

  async function patch(value: string | null, iteration = 0) {
    settle(value)

    if (pending && iteration === 0) return

    if (iteration === MAX_ITERATIONS) return settle()

    pending = true

    const result = await assign(receipt.id, { autolock: value })

    if (result instanceof Error) return settle()

    if (transient !== undefined && transient !== value) return patch(transient, iteration + 1)

    settle()
  }

  function onCheckedChange(value: boolean) {
    patch(value ? actor : null)
  }

  function onpayerchange(value: string | undefined) {
    if (value !== undefined) patch(value)
  }
</script>

<div class="space-y-2">
  <label
    for="autoclose-switch"
    class="block cursor-pointer"
    style="view-transition-name: splitter-autoclose-switch;">
    <Item.Root class="items-start">
      <Item.Media>
        <ChartPie class="text-muted-foreground" />
      </Item.Media>
      <div class="flex flex-col flex-1 gap-2">
        <Item.Content class="flex-row flex-1 justify-between">
          <div>
            <Item.Title>{$dict.autoclose.title}</Item.Title>
            <Item.Description>{$dict.autoclose.description}</Item.Description>
          </div>
          <Item.Actions class="pt-1.5">
            <Switch id="autoclose-switch" {checked} {onCheckedChange} />
          </Item.Actions>
        </Item.Content>
        {#if checked}
          <Item.Content>
            <Item.Title>{$dict.autoclose.payer.title}</Item.Title>
            <PayerSelect
              value={autolock ?? undefined}
              identities={receipt.identities}
              onchange={onpayerchange}
              id="receipts-autoclose-payer-select" />
          </Item.Content>
        {/if}
      </div>
    </Item.Root>
  </label>
</div>
