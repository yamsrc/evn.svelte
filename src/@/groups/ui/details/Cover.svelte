<script lang="ts">
  import { Picture } from '@/media/ui'
  import type { ComponentProps } from 'svelte'
  import type { Group } from '@/groups'

  interface Props extends Omit<ComponentProps<typeof Picture>, 'id' | 'alt' | 'variant'> {
    group: Pick<Group, 'name' | 'title' | 'picture'>
  }

  const { group, class: classes, style, ...props }: Props = $props()
</script>

{#if group.picture}
  <Picture
    id={group.picture}
    alt={group.title ?? group.name}
    variant="700x500"
    class={classes}
    {style}
    {...props} />
{/if}
