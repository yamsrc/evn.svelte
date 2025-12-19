<script lang="ts">
  import { readable, type Readable } from 'svelte/store'
  import { timeout } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { Progress } from '$ui/progress'
  import type { Props } from './Hold'

  const {
    duration = 800,
    label,
    variant = 'ghost',
    children,
    position = 'left',
    align = 'center',
    onclick,
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

  function click() {
    if (!pressed) return

    onclick?.(null as any)
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
</script>

<div>
  <Button
    {variant}
    {...props}
    {onpointerdown}
    oncontextmenu={swallow}
    onpointerup={cancel}
    onpointerleave={cancel}
    style="anchor-name: --hold;"
  >
    {@render children?.()}
  </Button>

  <div
    class={cn(
      'absolute w-fit min-w-26 transition-all ease-in-out space-y-1',
      'bg-background/85 p-2 pt-1 rounded-md',
      'opacity-0 scale-0',
      {
        'translate-x-1/2': position === 'left',
        '-translate-x-1/2': position === 'right',
        'translate-y-1/2': position === 'top',
        '-translate-y-1/2': position === 'bottom',
      },
      shown && 'translate-x-0 translate-y-0 opacity-100 scale-100',
    )}
    style={`position-anchor: --hold; position-area: ${position} ${align};`}
  >
    <div class="text-xs text-muted-foreground">{label}</div>
    <Progress
      value={progress}
      class="h-1 [&_div[data-slot=progress-indicator]]:bg-destructive/90 [&_div[data-slot=progress-indicator]]:transition-none"
    />
  </div>
</div>
