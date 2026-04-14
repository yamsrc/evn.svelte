<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  const { children, class: classes, ...props }: HTMLAttributes<HTMLHeadingElement> = $props()
</script>

<h1 class={['flex items-center min-h-12', classes]} {...props}>
  {@render children?.()}
</h1>
