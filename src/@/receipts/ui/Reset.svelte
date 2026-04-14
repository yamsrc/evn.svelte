<script lang="ts">
  import { Eraser } from '@lucide/svelte'
  import { reset } from '@/receipts'
  import { Button } from '$ui/button'
  import type { Props } from './Reset'

  const { id }: Props = $props()

  async function onclick(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement

    button.disabled = true

    await reset(id)

    button.disabled = false
  }
</script>

<Button {onclick} size="icon" variant="outline">
  <Eraser />
</Button>
