<script lang="ts">
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import type { Props } from './Action'

  const { children, size = 'icon-lg', class: classes, ...props }: Props = $props()
</script>

<Button {size} class={cn('[&_span]:sr-only', classes)} {...props}>
  {@render children?.()}
</Button>
