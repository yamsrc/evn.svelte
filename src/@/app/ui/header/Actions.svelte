<script lang="ts">
  import * as ButtonGroup from '$ui/button-group'
  import type { HTMLAttributes } from 'svelte/elements'

  const { children, class: classes, ...props }: HTMLAttributes<HTMLDivElement> = $props()
</script>

<ButtonGroup.Root class={["[&_svg:not([class*='size-'])]:size-5", classes]} {...props}>
  {@render children?.()}
</ButtonGroup.Root>
