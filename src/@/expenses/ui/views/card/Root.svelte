<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Root'

  const { children, highlighted, class: classes, ...rest }: Props = $props()
</script>

<Button
  variant="outline"
  size="lg"
  class={[
    'px-4 py-3 h-fit flex flex-col items-stretch gap-3 relative',
    highlighted && 'ring-inset ring-2 ring-muted-foreground/50',
    classes,
  ]}
  {...rest}>
  {@render children()}
</Button>
