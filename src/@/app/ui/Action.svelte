<script lang="ts">
  import { Button } from '$ui/button'
  import { actionVariants, type Props } from './Action'

  const { children, ...props }: Props = $props()
</script>

<Button class={actionVariants(props)}>
  {@render children?.()}
</Button>
