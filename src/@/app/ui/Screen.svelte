<script lang="ts">
  import { Screen } from '$com/shell'
  import type { Props } from './Screen'

  const { children, class: classes, ...rest }: Props = $props()
</script>

<Screen class={['flex-1 flex flex-col justify-between', classes]} {...rest}>
  {@render children()}
</Screen>
