<script lang="ts">
  import { goto } from '$app/navigation'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import type { Props, Action } from './Panel'

  const {
    collapsed,
    selected,
    highlighted,
    h,
    left,
    right,
    bottom,
    icon,
    actions,
    action,
    class: classes,
    variant = 'outline',
    ...props
  }: Props = $props()

  let container: HTMLDivElement

  function click(e: Event, { href, onclick }: Pick<Action, 'href' | 'onclick'>) {
    container.scrollTo({
      left: 0,
      behavior: 'smooth',
    })

    return href === undefined ? onclick?.(e) : goto(href)
  }
</script>

<div
  class={cn(
    'relative overflow-hidden rounded-lg transition-all duration-200 ease-in-out',
    collapsed ? 'h-0' : h,
    selected && 'outline-muted-foreground/50 outline-2',
    highlighted && 'bg-accent',
  )}>
  <div
    bind:this={container}
    class="panel-container flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
    <div class="w-full shrink-0 snap-start z-10">
      <Button
        class={cn(
          'w-full max-w-full flex items-center justify-between gap-2 text-base font-normal',
          h || 'h-auto',
          classes,
          {
            'bg-accent dark:bg-accent': selected,
          },
        )}
        {variant}
        {...props}>
        <div class="flex items-center justify-start gap-2 shrink overflow-hidden">
          {#if icon}
            <div class="shrink-0">
              {@render icon()}
            </div>
          {/if}
          {@render left()}
        </div>
        <div>
          {@render right?.()}
        </div>
      </Button>
    </div>
    {#if actions}
      <div
        role="toolbar"
        class="panel-actions flex shrink-0 snap-end text-xs [&_svg]:size-4 -ml-1 z-0 bg-foreground">
        {#each actions as { id, class: classes, href, onclick } (id)}
          <button
            onclick={(e) => click(e, { href, onclick })}
            class={cn(
              'flex flex-col items-center justify-center gap-1 hover:cursor-pointer hover:bg-muted-foreground/20',
              actions.length === 1 ? 'w-24' : 'w-16',
              classes,
            )}>
            {@render action(id)}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>
