<script lang="ts">
  import { Minus, Plus } from '@lucide/svelte'
  import { SvelteMap } from 'svelte/reactivity'
  import { Button } from '$ui/button'
  import * as ButtonGroup from '$ui/button-group'
  import type { Props } from './Zoom'

  let {
    contentW,
    contentH,
    viewBox = $bindable(''),
    maxZoom = 3,
    zoomStep = 1.5,
    pad = 28,
    class: classes,
    children,
  }: Props = $props()

  let containerW = $state(0)
  let containerH = $state(0)
  let zoom = $state(1)
  let cx = $state(0)
  let cy = $state(0)
  let dragging = $state(false)
  let pinching = $state(false)

  const shrunk = $derived(contentW > containerW || contentH > containerH)
  const baseW = $derived(Math.max(contentW, containerW || contentW) + pad * 2)
  const baseH = $derived(Math.max(contentH, containerH || contentH) + pad * 2)

  function clampXY(x: number, y: number, z: number) {
    const rX = (baseW / 2) * (1 - 1 / z)
    const rY = (baseH / 2) * (1 - 1 / z)
    const mX = contentW / 2
    const mY = contentH / 2

    return [
      Math.max(mX - rX, Math.min(mX + rX, x)),
      Math.max(mY - rY, Math.min(mY + rY, y)),
    ] as const
  }

  function applyZoom(z: number) {
    const centered = zoom <= 1

    zoom = z

    const [x, y] = clampXY(centered ? contentW / 2 : cx, centered ? contentH / 2 : cy, z)

    cx = x
    cy = y
  }

  $effect(() => {
    const w = baseW / zoom
    const h = baseH / zoom
    const [x, y] = clampXY(cx, cy, zoom)

    viewBox = `${x - w / 2} ${y - h / 2} ${w} ${h}`
  })

  // --- Pointer tracking (drag + pinch) ---

  const pointers = new SvelteMap<number, { x: number; y: number }>()
  let dragStart = { x: 0, y: 0, cx: 0, cy: 0 }
  let pinchStart = { dist: 0, zoom: 1, cx: 0, cy: 0 }

  function pinchDist() {
    const [a, b] = [...pointers.values()]

    return a && b ? Math.hypot(b.x - a.x, b.y - a.y) : 0
  }

  function onpointerdown(e: PointerEvent) {
    if (zoom <= 1 && pointers.size === 0) return

    if (e.target instanceof Element && e.target.closest('[data-slot="button-group"]')) return

    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.size === 2) {
      dragging = false
      pinching = true
      pinchStart = { dist: pinchDist(), zoom, cx, cy }

      return
    }

    if (zoom <= 1) return

    dragging = true
    dragStart = { x: e.clientX, y: e.clientY, cx, cy }

    if (e.currentTarget instanceof Element) e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onpointermove(e: PointerEvent) {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pinching && pointers.size === 2) {
      const d = pinchDist()

      if (pinchStart.dist > 0)
        applyZoom(Math.max(1, Math.min(maxZoom, pinchStart.zoom * (d / pinchStart.dist))))

      return
    }

    if (!dragging || containerW <= 0 || containerH <= 0) return

    const dx = ((e.clientX - dragStart.x) / containerW) * (baseW / zoom)
    const dy = ((e.clientY - dragStart.y) / containerH) * (baseH / zoom)

    const [x, y] = clampXY(dragStart.cx - dx, dragStart.cy - dy, zoom)

    cx = x
    cy = y
  }

  function onpointerup(e: PointerEvent) {
    pointers.delete(e.pointerId)
    dragging = false

    if (pointers.size < 2) pinching = false
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={['relative overflow-hidden w-full h-full', shrunk && 'touch-none', classes]}
  style:cursor={dragging ? 'grabbing' : zoom > 1 ? 'grab' : undefined}
  bind:clientWidth={containerW}
  bind:clientHeight={containerH}
  {onpointerdown}
  {onpointermove}
  {onpointerup}
  onpointercancel={onpointerup}>
  {@render children?.()}

  {#if shrunk || zoom > 1}
    <ButtonGroup.Root class="absolute bottom-2 inset-e-2 z-10">
      <Button
        variant="outline"
        size="icon-sm"
        disabled={zoom <= 1}
        onclick={() => applyZoom(Math.max(1, zoom / zoomStep))}>
        <Minus class="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        disabled={zoom >= maxZoom}
        onclick={() => applyZoom(Math.min(maxZoom, zoom * zoomStep))}>
        <Plus class="size-4" />
      </Button>
    </ButtonGroup.Root>
  {/if}
</div>
