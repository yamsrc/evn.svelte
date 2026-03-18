<script lang="ts">
  import * as Picker from '$com/picker'
  import type { Props } from './Root'

  const { children, class: classes, onpick, ...rest }: Props = $props()
</script>

<Picker.Root class={['gap-2', classes]} onpick={onpick ?? (() => {})} bleed {...rest}>
  {@render children()}
</Picker.Root>
