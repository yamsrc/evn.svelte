<script lang="ts">
  import { Lock } from '@lucide/svelte'
  import { Check } from '@lucide/svelte'
  import { account } from '@/iam'
  import { Attention } from '$com/shell'
  import type { Props } from './Indicator'

  const { receipt }: Props = $props()
  const me = $derived($account?.id)
</script>

{#if receipt.locked && receipt.locker === me}
  <Attention class="mx-1 animate-pulse" />
{:else if receipt.locked}
  <Lock class="text-muted-foreground mx-0.5" />
{:else if me && receipt.done[me] === true}
  <Check class="text-muted-foreground mx-0.5" />
{:else}
  <Attention class="mx-1 animate-pulse" />
{/if}
