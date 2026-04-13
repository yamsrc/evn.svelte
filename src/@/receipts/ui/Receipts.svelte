<script lang="ts">
  import { unseen } from '@/receipts'
  import Receipt from './Receipt.svelte'
  import type { Props } from './Receipts'

  const { receipts, notifications }: Props = $props()
</script>

<div id="receipts-list" class="flex flex-col gap-1.5">
  {#each receipts as receipt (receipt.id)}
    {@const highlighted = unseen(receipt, notifications ?? [])}
    <Receipt {receipt} {highlighted} />
  {/each}
</div>
