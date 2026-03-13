<script lang="ts">
  import { Invitation } from '@/receipts/ui'
  import { Section } from '@/app/ui'
  import { Button } from '$ui/button'
  import { goto } from '$app/navigation'

  let receiptId = $state('')
  let active = $state<string | null>(null)

  function onshow() {
    const id = receiptId.trim()

    if (id)
      active = id
  }

  function onaccept() {
    if (active)
      goto(`/dev/components/receipts/${active}/`)
  }
</script>

<Section class="py-4">
  <label class="flex flex-col gap-2">
    <!-- TODO: i18n -->
    <span>Receipt ID</span>
    <input type="text" bind:value={receiptId} class="border rounded px-2 py-1" />
  </label>
  <!-- TODO: i18n -->
  <Button onclick={onshow} class="mt-2">Show</Button>

  {#if active}
    {#key active}
      <div class="mt-4">
        <Invitation receiptId={active} {onaccept} />
      </div>
    {/key}
  {/if}
</Section>
