<script lang="ts">
  import * as Card from '$ui/card'
  import type { Props } from './Panel'

  const { children, name, class: classes, contentClass }: Props = $props()
</script>

<Card.Root
  class={['bg-background px-4 py-3', classes]}
  style={name ? `view-transition-name: ${name};` : undefined}>
  <Card.Content class={['space-y-2 p-0 size-full', contentClass]}>
    {@render children()}
  </Card.Content>
</Card.Root>
