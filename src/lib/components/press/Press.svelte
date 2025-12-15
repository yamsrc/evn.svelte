<script lang="ts">
  import { readable, type Readable } from 'svelte/store'
  import { timeout } from '$lib/tools'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { Progress } from '$ui/progress'
  import type { Props } from './Press'

  const {
    duration = 800,
    label = 'Hold to confirm',
    align = 'center',
    children,
    variant = 'destructive',
    onclick,
    class: classes,
    ...props
  }: Props = $props()

  let pressed = $state(false)
  let shown = $state(false)
  let hiding = $state<ReturnType<typeof setTimeout> | null>(null)
  let countdown = $state<Readable<number>>(readable(duration))

  const progress = $derived((1 - $countdown! / duration) * 100)

  $effect(() => {
    if ($countdown === 0) click()
  })

  function onpointerdown(e: PointerEvent) {
    pressed = true
    shown = true
    countdown = timeout(duration)

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
</script>

<div class="relative">
  <div
    class={cn(
      'absolute top-0 w-full min-w-24 translate-y-0 transition-all ease-in-out pb-2',
      'opacity-0 scale-0',
      align === 'center' && 'left-1/2 -translate-x-1/2',
      align === 'left' && 'left-0',
      align === 'right' && 'right-0',
      shown && '-translate-y-full opacity-100 scale-100',
    )}
  >
    <div class="text-xs text-muted-foreground">{label}</div>
    <Progress
      value={progress}
      class="h-1 [&_div[data-slot=progress-indicator]]:bg-destructive/90"
    />
  </div>
  <Button
    {variant}
    {...props}
    {onpointerdown}
    onpointerup={cancel}
    onpointerleave={cancel}
    class={cn('relative', classes)}
  >
    {@render children?.()}
  </Button>
</div>
