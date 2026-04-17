<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Update'

  const { children, ...rest }: Props = $props()
</script>

<Button {...rest}>
  {@render children?.()}
</Button>
