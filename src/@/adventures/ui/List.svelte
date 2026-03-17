<script lang="ts">
  import * as Picker from '$com/picker'
  import type { Props } from './List'

  const { children, class: classes, onpick, ...rest }: Props = $props()
</script>

<Picker.Root
  class={['adventure-list gap-gap', classes]}
  onpick={onpick ?? (() => {})}
  bleed
  {...rest}>
  {@render children()}
</Picker.Root>

<style>
  @layer components {
    :global(.adventure-list > *) {
      width: calc(50cqi - var(--spacing-gap) / 2);
      max-width: 16rem;
      flex-shrink: 0;
    }
  }
</style>
