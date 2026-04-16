<script lang="ts">
  import { Button } from '$ui/button'
  import { Attention } from '$com/shell'
  import type { Props } from './Button'

  const {
    active = false,
    faded = false,
    unseen = false,
    id,
    children,
    class: classes,
    variant = 'ghost',
    ...props
  }: Props = $props()
</script>

<Button
  {id}
  {variant}
  class={[
    'relative flex flex-col h-full flex-1 min-w-16 p-3 gap-1 text-sm transition-colors duration-300 hover:bg-accent/25 overflow-hidden rounded-xl',
    active && 'text-accent-foreground',
    classes,
  ]}
  {...props}>
  {#if active}
    <div
      class="absolute inset-0 bg-background z-0 rounded-[calc(var(--radius)+2px)] m-1"
      style="view-transition-name: shell-nav-active; view-transition-class: transition-morph;">
    </div>
  {/if}
  {#if unseen}
    <Attention
      id={id ? `${id}-notify` : undefined}
      class={['absolute top-2.5 inset-e-2.5 z-10', faded && 'opacity-25']} />
  {/if}
  <div
    class={[
      "flex flex-col items-center gap-0.5 z-10 font-bold [&_svg:not([class*='size-'])]:size-5",
      'transition-opacity duration-200',
      faded && 'opacity-25',
    ]}
    style={id
      ? `view-transition-name: ${id}; view-transition-class: shell-nav-item transition-morph;`
      : undefined}>
    {@render children?.()}
  </div>
</Button>

<style>
  ::view-transition-group(*.shell-nav-item),
  ::view-transition-group(.attention) {
    z-index: 1;
  }

  ::view-transition-group(shell-nav-active) {
    z-index: 1;
  }

  ::view-transition-new(shell-nav-active):only-child {
    opacity: 0;
  }
</style>
