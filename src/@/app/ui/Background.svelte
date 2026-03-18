<script lang="ts" module>
  const containers = $state<HTMLDivElement[]>([])
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { dict } from '$lib/intl'
  import { ios, safari, shell, standalone } from '$lib/tools/mq'
  import { update } from '@/accounts'
  import { account } from '@/iam'
  import { backgrounds, overriden, type Props } from './Background'
  import Slide from './Slide.svelte'

  const { scrollable, class: classes }: Props = $props()

  const app = standalone || shell
  const safariBrowser = ios && safari && !app

  const faded = $derived(!scrollable && safariBrowser)

  let container: HTMLDivElement | null = $state(null)

  const selected = backgrounds.findIndex((background) => background.id === $account?.background)

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

      return
    }

    if ($account) void update($account.id, { background: id })
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
    scrollable || 'overflow-hidden',
    mounted || 'invisible',
    faded && 'fade-edges',
    classes,
  ]}
  onscroll={scrollable ? onscroll : undefined}>
  {#each backgrounds as background, i (background.id)}
    {#if scrollable || !$overriden || $overriden === background.id}
      <div
        bind:this={slides[i]}
        data-id={background.id}
        class={['h-full w-full shrink-0 ', scrollable && 'snap-center', i === 0 && 'relative']}
        style="background: url('/bg/{background.filename}') 50% 50% / {scale(
          background.width,
        )}px {scale(background.height)}px repeat; {scrollable
          ? ''
          : `opacity: ${background.opacity?.toString() ?? '0.2'}`}">
        {#if scrollable && i === 0 && $account?.background === undefined}
          <Slide class="h-full justify-end p-8">{$dict.actions.slide}</Slide>
        {/if}
      </div>
    {/if}
  {/each}
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
