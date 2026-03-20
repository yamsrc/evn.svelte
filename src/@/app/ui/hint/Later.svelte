<script lang="ts">
  import { Button } from '$ui/button'
  import { getContext } from './Context'
  import type { Props } from './Later'

  const { children, ...rest }: Props = $props()
  const { later } = getContext()
</script>

<Button variant="ghost" onclick={later} {...rest}>
  {@render children?.()}
</Button>
