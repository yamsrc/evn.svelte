<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { del } from '@/expenses.templates'
  import { Spinner } from '$ui/spinner'
  import { Hold } from '$com/buttons'
  import { dict } from './intl'
  import type { Props } from './Delete'

  const { id, ondelete }: Props = $props()

  let busy = $state(false)

  async function onclick() {
    busy = true

    const deleted = await del(id)

    busy = false

    if (deleted instanceof Error) return

    ondelete?.()
  }
</script>

<Hold
  name="delete-template"
  variant="secondary"
  position="top"
  align="center"
  label={$dict.delete.hold}
  disabled={busy}
  {onclick}>
  {#if busy}
    <Spinner />
  {:else}
    <Trash2 />
  {/if}
  {$dict.delete.label}
</Hold>
