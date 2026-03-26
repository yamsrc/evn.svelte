<script lang="ts">
  import { Button } from '$ui/button'
  import { defaults, type Props } from './Action'

  const { children, class: classes, ...props }: Props = $props()
</script>

<Button class={[defaults.class, classes]} {...props}>
  {@render children?.()}
</Button>
