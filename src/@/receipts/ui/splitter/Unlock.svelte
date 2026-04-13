<script lang="ts">
  import { LockKeyholeOpen } from '@lucide/svelte'
  import { unlock } from '@/receipts'
  import { Button } from '$ui/button'
  import type { Props } from './Unlock'

  const { receipt }: Props = $props()

  async function onclick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement

    button.disabled = true

    await unlock(receipt.id)

    button.disabled = false
  }
</script>

<Button variant="secondary" size="lg" {onclick}>
  <LockKeyholeOpen />
</Button>
