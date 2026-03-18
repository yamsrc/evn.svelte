<script lang="ts">
  import { Button } from '$ui/button'
  import { getContext } from './Context'
  import type { Props } from './Dismiss'

  const { children, ...rest }: Props = $props()
  const { dismiss } = getContext()
</script>

<Button class="w-fit" onclick={dismiss} {...rest}>
  {@render children?.()}
</Button>
