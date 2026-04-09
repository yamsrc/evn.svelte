<script lang="ts">
  import { ArrowBigDownDash, ArrowBigUpDash } from '@lucide/svelte'
  import { exclude, include } from '@/receipts'
  import { Coins } from '@/app/ui'
  import { Button } from '$ui/button'
  import { transit } from '$lib/tools'
  import type { Props } from './Extra'

  const { receipt, extra, portion }: Props = $props()
  const amount = $derived(portion === undefined ? extra.amount : extra.amount * portion)

  function toggle(id: string) {
    transit(() => void (extra.included ? exclude(receipt.id, id) : include(receipt.id, id)))
  }
</script>

<div
  class="flex justify-between"
  style="view-transition-name: receipt-extra-{extra.id}; view-transition-class: transition-spring transition-morph receipt-extra;">
  <div class="flex items-center gap-1">
    <span>{extra.name}</span>
    <Button variant="ghost" size="icon-sm" onclick={() => toggle(extra.id)} class="bg-transparent!">
      {#if extra.included}
        <ArrowBigUpDash />
      {:else}
        <ArrowBigDownDash />
      {/if}
    </Button>
  </div>
  <Coins {amount} sign="neutral" />
</div>

<style>
  ::view-transition-group(.receipt-extra) {
    z-index: 100;
  }
</style>
