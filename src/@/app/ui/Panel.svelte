<script lang="ts">
  import * as Card from '$ui/card'
  import type { Props } from './Panel'

  const { children, name, class: classes }: Props = $props()
</script>

<Card.Root
  class={['bg-background p-4', classes]}
  style={name ? `view-transition-name: ${name};` : undefined}>
  <Card.Content class="space-y-2 p-0">
    {@render children()}
  </Card.Content>
</Card.Root>
