<script lang="ts">
  import { cn } from '$lib/utils'
  import { Picture } from '@/media/ui'
  import type { Props } from './Picture'

  const { account, size = 400, variant = '300x300!', class: classes, style }: Props = $props()
</script>

{#if account.picture}
  <Picture
    id={account.picture}
    alt={account.name}
    {variant}
    width={size}
    height={size}
    class={cn('rounded-full', classes)}
    {style} />
{/if}
