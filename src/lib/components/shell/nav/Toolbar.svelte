<script lang="ts">
  import * as ButtonGroup from '$ui/button-group'
  import { actions } from './store'
  import type { Props } from './Toolbar'

  const { position }: Props = $props()

  const action = $derived($actions.at(-1) ?? null)
</script>

{#if action && position !== 'center'}
  <div
    class="flex h-full py-1 sm:me-4 transition-all duration-300 [&_svg:not([class*='size-'])]:size-5"
    style="view-transition-name: shell-actions-{position}; view-transition-class: shell-actions">
    <ButtonGroup.Root class={['flex h-full', action?.class]}>
      {@render action.snippet()}
    </ButtonGroup.Root>
  </div>
{/if}

<style>
  ::view-transition-group(.shell-actions) {
    z-index: 1;
  }

  ::view-transition-old(shell-actions-start),
  ::view-transition-new(shell-actions-start),
  ::view-transition-old(shell-actions-end),
  ::view-transition-new(shell-actions-end) {
    width: auto;
    isolation: isolate;
  }

  @keyframes slide-out-right {
    to {
      transform: translateX(150%);
    }
  }

  @keyframes slide-in-left {
    from {
      transform: translateX(150%);
    }
  }

  @keyframes slide-out-left {
    to {
      transform: translateX(-150%);
    }
  }

  @keyframes slide-in-right {
    from {
      transform: translateX(-150%);
    }
  }

  ::view-transition-old(shell-actions-start):only-child {
    animation: slide-out-right 0.3s ease-out both;
  }

  ::view-transition-new(shell-actions-start):only-child {
    animation: slide-in-left 0.3s ease-out both;
  }

  ::view-transition-old(shell-actions-end):only-child {
    animation: slide-out-left 0.3s ease-out both;
  }

  ::view-transition-new(shell-actions-end):only-child {
    animation: slide-in-right 0.3s ease-out both;
  }
</style>
