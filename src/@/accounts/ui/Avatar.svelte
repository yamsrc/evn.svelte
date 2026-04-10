<script lang="ts">
  import { Crown } from '@lucide/svelte'
  import { Picture } from '@/accounts/ui'
  import * as accounts from '@/accounts'
  import type { Props } from './Avatar'

  const { account, size = 32, style, ...rest }: Props = $props()

  const premium = $derived(accounts.premium(account))
</script>

<div class={[premium && 'rounded-full border-2 border-premium relative']} {style}>
  {#if premium}
    <div
      class={[
        'bg-premium rounded-full absolute top-[calc(50%-50%/sqrt(2))] left-[calc(50%-50%/sqrt(2))] -translate-1/2 z-1',
        size <= 32 ? 'size-3 p-0.5' : 'size-6 p-1',
      ]}>
      <Crown class="size-full text-background" fill="currentColor" />
    </div>
  {/if}
  <Picture {account} {size} {...rest} />
</div>
