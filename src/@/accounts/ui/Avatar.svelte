<script lang="ts">
  import { get } from 'svelte/store'
  import { Crown } from '@lucide/svelte'
  import { time } from '@/realtime'
  import { Picture } from '@/accounts/ui'
  import type { Props } from './Avatar'

  const { account, size = 32, ...rest }: Props = $props()

  const premium = $derived(account.premium !== undefined && account.premium > get(time))
</script>

<div class={[premium && 'rounded-full border-2 border-premium relative']}>
  {#if premium && size > 32}
    <div
      class="bg-premium rounded-full size-6 absolute top-[calc(50%-50%/sqrt(2))] left-[calc(50%-50%/sqrt(2))] -translate-1/2 p-1 z-1">
      <Crown class="size-full text-background" fill="currentColor" />
    </div>
  {/if}
  <Picture {account} {size} {...rest} />
</div>
