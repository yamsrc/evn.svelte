<script lang="ts">
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { defaults, type Props } from './Action'

  const { children, size = defaults.size, class: classes, ...props }: Props = $props()
</script>

<Button {size} class={cn('[&_span]:sr-only', defaults.class, classes)} {...props}>
  {@render children?.()}
</Button>
