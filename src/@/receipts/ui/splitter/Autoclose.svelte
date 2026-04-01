<script lang="ts">
  import { ChartPie } from '@lucide/svelte'
  import { assign } from '@/receipts'
  import { PayerSelect } from '@/expenses/ui'
  import { Switch } from '$ui/switch'
  import * as Item from '$ui/item'
  import { transit } from '$lib/tools'
  import { dict } from '../intl'
  import type { Props } from './Autoclose'

  let { receipt, actor, payer = $bindable() }: Props = $props()

  let checked = $state(payer !== undefined)
  let busy = $state(false)

  async function patch(autolock: string | null) {
    busy = true
    await assign(receipt.id, { autolock })
    busy = false
  }

  async function onCheckedChange(value: boolean) {
    if (value) {
      await patch(actor)

      transit(() => {
        checked = true
        payer = actor
      })
    } else {
      await patch(null)

      transit(() => {
        checked = false
        payer = undefined
      })
    }
  }

  async function onpayerchange(value: string | undefined) {
    if (value !== undefined) await patch(value)
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
      <Item.Content>
        <Item.Title>{$dict.autoclose.title}</Item.Title>
        <Item.Description>{$dict.autoclose.description}</Item.Description>
      </Item.Content>
      <Item.Actions class="pt-1.5">
        <Switch id="autoclose-switch" {checked} {onCheckedChange} disabled={busy} />
      </Item.Actions>
    </Item.Root>
  </label>
  {#if checked}
    <PayerSelect
      bind:value={payer}
      identities={receipt.identities}
      disabled={busy}
      onchange={onpayerchange}
      id="receipts-autoclose-payer-select" />
  {/if}
</div>
