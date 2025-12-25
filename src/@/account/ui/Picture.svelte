<script lang="ts">
  import { cn } from '$lib/utils'
  import { Picture } from '@/media/ui'
  import type { Props } from './Picture'

  const { account, size = 400, class: classes }: Props = $props()
</script>

{#if account?.picture}
  <Picture
    id={account.picture}
    alt={account.name}
    variant="400x400!"
    width={size}
    height={size}
    class={cn('rounded-full', classes)}
    style={`view-transition-name: account-picture-${account.id};`}
  />
{/if}
