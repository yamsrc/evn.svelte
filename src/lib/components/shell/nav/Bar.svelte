<script lang="ts">
  import { faded } from './store'
  import type { Props } from './Bar'

  const { children, class: classes, ...props }: Props = $props()
</script>

<div
  class={[$faded ? 'bg-background' : 'bg-muted', 'overflow-hidden flex sm:ms-4 h-full rounded-xl', classes]}
  style="view-transition-name: shell-nav; view-transition-class: transition-morph;"
  {...props}>
  {@render children?.()}
</div>

<style>
  ::view-transition-old(shell-nav),
  ::view-transition-new(shell-nav) {
    isolation: isolate;
  }

  ::view-transition-group(shell-nav) {
    z-index: 1;
  }
</style>
