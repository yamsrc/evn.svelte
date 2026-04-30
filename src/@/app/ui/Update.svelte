<script lang="ts">
  import { apply } from '@/app'
  import { Button } from '$ui/button'
  import type { Props } from './Update'

  const { children, ...rest }: Props = $props()

  function onclick(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement

    button.disabled = true
    apply()
  }
</script>

<Button {onclick} {...rest}>
  {@render children?.()}
</Button>
