<script lang="ts">
  import { setGroupContext } from './GroupContext'
  import type { Props } from './Group'

  const { children, direction = 'col', class: classes }: Props = $props()

  const directionState = $derived(direction)

  setGroupContext({
    get direction() {
      return directionState
    },
  })
</script>

<div
  class={[
    'w-full flex gap-1 group text-base font-normal',
    direction === 'row' ? 'flex-row justify-around text-sm' : 'flex-col',
    classes,
  ]}
  data-direction={direction}>
  {@render children()}
</div>
