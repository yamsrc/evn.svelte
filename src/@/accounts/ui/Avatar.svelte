<script lang="ts">
  import { Crown } from '@lucide/svelte'
  import { Picture } from '@/accounts/ui'
  import * as accounts from '@/accounts'
  import type { Props } from './Avatar'

  const { account, size = 32, style, class: classes, ...rest }: Props = $props()

  const premium = $derived(accounts.premium(account))
</script>

<div class={[premium && 'relative premium-frame rounded-full', classes]} {style}>
  {#if premium}
    <div
      class={[
        'bg-premium rounded-full absolute top-[calc(50%-50%/sqrt(2))] left-[calc(50%-50%/sqrt(2))] -translate-1/2 z-1',
        size <= 24 && 'size-2 p-0.25',
        size > 24 && size <= 32 && 'size-3 p-0.5',
        size > 32 && 'size-6 p-1',
      ]}>
      <Crown class="size-full text-black" fill="currentColor" />
    </div>
  {/if}
  <Picture {account} {size} {...rest} />
</div>

<style>
  .premium-frame::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: inherit;
    background: var(--gradient-premium);

    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;

    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
  }
</style>
