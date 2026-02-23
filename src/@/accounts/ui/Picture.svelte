<script lang="ts">
  import { CircleX } from '@lucide/svelte'
  import { deleted } from '@/accounts'
  import { Picture } from '@/media/ui'
  import type { Props } from './Picture'

  const { account, size = 400, class: classes, style }: Props = $props()
</script>

{#if deleted(account)}
  <CircleX class={['text-muted-foreground rounded-full', `size-[${size}px]`, classes]} {style} />
{:else if account.picture}
  <Picture
    id={account.picture}
    alt={account.name}
    variant="300x300!"
    width={size}
    height={size}
    class={['rounded-full', classes]}
    {style} />
{/if}
