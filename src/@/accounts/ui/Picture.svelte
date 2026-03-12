<script lang="ts">
  import { Picture } from '@/media/ui'
  import { cn } from '$lib/utils'
  import type { Props } from './Picture'

  const { account, size = 400, class: classes, style }: Props = $props()
</script>

{#if account.picture}
  <Picture
    id={account.picture}
    alt={account.name}
    variant="300x300!"
    width={size}
    height={size}
    class={cn('rounded-full', classes)}
    {style} />
{/if}
