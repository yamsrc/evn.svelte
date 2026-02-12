<script lang="ts">
  import { PencilLine } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { Action } from '@/app/ui'
  import type { Props } from './Draft'

  const { value, ...rest }: Props = $props()

  function draft() {
    goto('/expenses/editor/', { state: { expense: value } })
  }
</script>

<Action id="expenses-draft-action" onclick={draft} {...rest}>
  <PencilLine />
</Action>
