<script lang="ts" module>
  const containers = $state<HTMLDivElement[]>([])
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { account } from '@/iam'
  import { wallpaper } from '@/accounts'
  import { ios, safari, shell, standalone } from '$lib/tools/mq'
  import { dict } from '$lib/intl'
  import Slide from '../Slide.svelte'
  import { patterns, opacity, overriden, type Props } from './Pattern'
  import Effects from './Effects.svelte'

  const { scrollable, class: classes }: Props = $props()

  const app = standalone || shell
  const safariBrowser = ios && safari && !app

  const faded = $derived(!scrollable && safariBrowser)

  let container: HTMLDivElement | null = $state(null)

  let pattern = $state<string | undefined>(
    $overriden?.pattern ?? $account?.wallpaper?.pattern ?? $account?.background,
  )

  const selected = patterns.findIndex((background) => background.id === pattern)

  const effect = $derived($overriden?.effect ?? $account?.wallpaper?.effect ?? null)

  function onscroll(e: Event) {
    const target = e.target as HTMLDivElement
    const percent = target.scrollLeft / target.clientWidth

    sync(percent)
  }

  function sync(percent: number) {
    if (!container) return

    for (const other of containers) {
      if (other === container) continue

      other.scrollLeft = percent * other.clientWidth
    }
  }

  // initial observation
  let ready = false

  function select(id: string) {
    if (!ready) {
      ready = true
      pattern = id

      return
    }

    if (id === pattern) return

    pattern = id

    if ($account) void wallpaper.set({ method: 'pattern', pattern: id, effect })
  }

  const slides: HTMLDivElement[] = $state([])

  onMount(() => {
    if (!scrollable || !container) return

    tick().then(() => {
      for (const slide of slides) observer.observe(slide)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        const intersected = entries.find((entry) => entry.isIntersecting)

        if (!intersected) return

        const target = intersected.target as HTMLElement
        const id = target.dataset.id

        if (id) select(id)
      },
      { root: container, threshold: 0.6 },
    )

    return () => observer.disconnect()
  })

  let mounted = $state(false)

  onMount(() => {
    if (!container) return

    containers.push(container)
    container.scrollLeft = (selected === -1 ? 0 : selected) * container.clientWidth
    mounted = true

    return () => {
      if (!container) return

      containers.splice(containers.indexOf(container), 1)
      mounted = false
    }
  })

  function scale(px: number) {
    return Math.round(scrollable ? px * 1.4 : px)
  }
</script>

<div
  bind:this={container}
  class={[
    'flex w-full',
    !scrollable && safariBrowser ? 'h-[calc(100%-10px)]' : 'h-full',
    scrollable &&
      'overflow-x-scroll overflow-y-hidden touch-pan-x overscroll-x-contain no-scrollbar snap-x snap-mandatory bg-input',
    scrollable || 'overflow-x-hidden',
    mounted || 'invisible',
    faded && 'fade-edges',
    classes,
  ]}
  onscroll={scrollable ? onscroll : undefined}>
  {#each patterns as pattern, i (pattern.id)}
    {#if scrollable || !$overriden || $overriden.pattern === pattern.id}
      <div
        bind:this={slides[i]}
        data-id={pattern.id}
        class={['h-full w-full shrink-0 relative', scrollable && 'snap-center']}
        style="background: url('/bg/{pattern.filename}') 50% 50% / {scale(pattern.width)}px {scale(
          pattern.height,
        )}px repeat; {scrollable ? '' : `opacity: ${opacity(pattern, effect)}`}">
        {#if effect}
          {@const mask = `url('/bg/${pattern.filename}') 50% 50% / ${scale(pattern.width)}px ${scale(pattern.height)}px`}
          <div
            class="absolute inset-0 effect-{effect}"
            style={`-webkit-mask: ${mask}; mask: ${mask}; -webkit-mask-repeat: repeat; mask-repeat: repeat;`}>
          </div>
        {/if}
        {#if scrollable && i === 0 && pattern === undefined}
          <Slide class="h-full justify-end p-8">{$dict.actions.slide}</Slide>
        {/if}
      </div>
    {/if}
  {/each}
  {#if scrollable}
    <div class="absolute bottom-2 inset-e-2">
      <Effects />
    </div>
  {/if}
</div>

<style>
  /* vertical fade: transparent top/bottom 32px, opaque middle */
  .fade-edges {
    mask-image: linear-gradient(
      to bottom,
      transparent,
      black 32px,
      black calc(100% - 32px),
      transparent
    );
  }
</style>
