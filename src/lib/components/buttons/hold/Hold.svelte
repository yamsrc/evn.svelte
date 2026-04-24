<script lang="ts">
  import { readable, type Readable } from 'svelte/store'
  import { Progress } from '$ui/progress'
  import { Button } from '$ui/button'
  import { cn } from '$lib/utils'
  import { timeout } from '$lib/tools'
  import type { Props } from './Hold'

  const {
    name = 'hold',
    duration = 800,
    label,
    variant = 'ghost',
    children,
    position = 'left',
    align = 'center',
    portal: portaled = true,
    onclick,
    onpress,
    class: classes,
    message,
    ...props
  }: Props = $props()

  let pressed = $state(false)
  let shown = $state(false)
  let hiding = $state<ReturnType<typeof setTimeout> | null>(null)
  // svelte-ignore state_referenced_locally
  let countdown = $state<Readable<number>>(readable(duration))

  const progress = $derived(Math.round((1 - $countdown! / duration) * 100))

  $effect(() => {
    if ($countdown === 0) click()
  })

  function onpointerdown(e: PointerEvent) {
    swallow(e)

    if (e.altKey) click(true)
    else press()
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key === ' ') press()
  }

  function press() {
    if (pressed) return

    onpress?.()
    pressed = true
    shown = true
    countdown = timeout(duration, 60)

    if (hiding) clearTimeout(hiding)
  }

  function cancel() {
    if (!pressed) return

    hiding = setTimeout(
      () => {
        shown = false
      },
      progress > 20 ? 200 : 1000, // show hint on regular clicks
    )

    pressed = false
    countdown = readable(duration)
  }

  function click(instant = false) {
    if (!pressed && !instant) return

    onclick?.()
    pressed = false

    hiding = setTimeout(() => {
      shown = false
      countdown = readable(duration)
    }, 300)
  }

  function swallow(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function portal(node: HTMLElement, enabled: boolean) {
    if (!enabled) return

    document.body.appendChild(node)

    return { destroy: () => node.remove() }
  }
</script>

<Button
  {variant}
  {...props}
  class={cn('select-none', classes)}
  {onpointerdown}
  {onkeydown}
  oncontextmenu={swallow}
  onpointerup={cancel}
  onpointerleave={cancel}
  onkeyup={cancel}
  style={`anchor-name: --${name};`}>
  {@render children?.()}
</Button>

{#if shown}
  <div
    use:portal={portaled}
    class={cn(
      'fixed z-1002 w-fit min-w-26 transition-all ease-in-out space-y-1',
      'bg-background/85 p-2 pt-1 rounded-md',
      'starting:scale-0',
    )}
    style={`position-anchor: --${name}; position-area: ${position} ${align};`}>
    <div class="text-xs text-muted-foreground">
      {#if message}
        {@render message()}
      {:else}
        {label}
      {/if}
    </div>
    <Progress
      value={progress}
      class="h-1 [&_div[data-slot=progress-indicator]]:bg-destructive/90 [&_div[data-slot=progress-indicator]]:transition-none" />
  </div>
{/if}
