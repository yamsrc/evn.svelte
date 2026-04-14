<script lang="ts">
  import { LogOut, Trash2 } from '@lucide/svelte'
  import { Hold } from '$com/buttons'
  import { dict } from '../intl'
  import type { Props } from './Leave'

  const { receipt, class: classes, onclick }: Props = $props()
  const shared = $derived(receipt.identities.length > 1)
</script>

<Hold
  variant="outline"
  size="icon"
  label={shared ? $dict.leave.label : $dict.delete.label}
  class={["[&_svg:not([class*='size-'])]:size-4! [&_svg]:text-destructive", classes]}
  {onclick}>
  {#if shared}
    <LogOut />
  {:else}
    <Trash2 />
  {/if}
</Hold>
