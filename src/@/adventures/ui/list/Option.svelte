<script lang="ts">
  import * as Picker from '$com/picker'
  import type { Props } from './Option'

  const { class: classes, ...props }: Props = $props()
</script>

<Picker.Option
  class={['w-[calc((100%-var(--spacing))/2)] max-w-64 shrink-0', classes]}
  {...props} />
