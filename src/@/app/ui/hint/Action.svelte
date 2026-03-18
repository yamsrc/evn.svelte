<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Action'

  const { children, ...rest }: Props = $props()
</script>

<Button class="w-fit" {...rest}>
  {@render children?.()}
</Button>
