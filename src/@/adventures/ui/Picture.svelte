<script lang="ts">
  import { Picture } from '@/media/ui'
  import type { Props } from './Picture'

  const { adventure, class: classes, style, ...props }: Props = $props()
</script>

{#if adventure.picture}
  <Picture
    id={adventure.picture}
    alt={adventure.title}
    variant="700x500"
    class={classes}
    {style}
    {...props} />
{/if}
