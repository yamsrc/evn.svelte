<script lang="ts">
  import { HeartCrack } from '@lucide/svelte'
  import { Hold } from '$com/buttons'
  import { del } from '@/contacts'
  import { dict } from './intl'
  import type { Props } from './Delete'

  const { contact, ondelete }: Props = $props()

  async function onclick() {
    const err = await del(contact)

    if (err instanceof Error) return

    ondelete?.()
  }
</script>

<Hold
  variant="outline"
  size="icon"
  position="left"
  label={$dict.delete.label}
  duration={2_000}
  {onclick}>
  <HeartCrack class="text-destructive" />
</Hold>
