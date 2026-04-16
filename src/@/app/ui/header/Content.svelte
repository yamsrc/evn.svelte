<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  const { children, class: classes, ...props }: HTMLAttributes<HTMLDivElement> = $props()
</script>

<div class={[classes]} {...props}>
  {@render children?.()}
</div>
