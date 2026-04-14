<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  const { children, class: classes, ...props }: HTMLAttributes<HTMLSpanElement> = $props()
</script>

<p class={['text-sm text-muted-foreground', classes]} {...props}>
  {@render children?.()}
</p>
