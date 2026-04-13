<script lang="ts">
  import Receipt from './Receipt.svelte'
  import type { Props } from './Receipts'

  const { receipts }: Props = $props()
</script>

<div id="receipts-list" class="flex flex-col gap-1.5">
  {#each receipts as receipt (receipt.id)}
    <Receipt {receipt} />
  {/each}
</div>
