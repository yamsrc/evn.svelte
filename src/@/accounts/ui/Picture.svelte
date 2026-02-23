<script lang="ts">
  import { CircleX } from '@lucide/svelte'
  import { Picture } from '@/media/ui'
  import type { Props } from './Picture'

  const { account, size = 400, class: classes, style = '' }: Props = $props()
</script>

{#if account.deleted}
  <CircleX
    class={['text-muted-foreground rounded-full', 'size-(--icon-size)', classes]}
    style={`--icon-size: ${size}px; ${style}`} />
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
