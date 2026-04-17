<script lang="ts">
  import { apply } from '@/app'
  import { Button } from '$ui/button'
  import type { Props } from './Update'

  const { children, onclick = apply, ...rest }: Props = $props()
</script>

<Button {onclick} {...rest}>
  {@render children?.()}
</Button>
