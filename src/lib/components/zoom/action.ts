import type { Action } from 'svelte/action'

const MIN = 1 // fitted size — the image can't zoom out smaller than the screen fit
const MAX = 8 // tall images fit by height, so they need headroom to inspect detail

/**
 * Svelte action: element-scoped pinch-zoom + pan of the wrapper's inner `<img>`.
 *
 * A stationary single touch is left as a click so it can bubble up to close the
 * fullscreen; closing (`open: false`) resets the image to its fitted size.
 *
 * @param node - wrapper element containing the `<img>` to transform
 * @param params.open - fullscreen open state; resets the transform when `false`
 */
export const zoom: Action<HTMLElement, { open: boolean }> = (node, { open }) => {
  let scale = MIN
  let tx = 0
  let ty = 0

  // gesture baselines
  let dist0 = 0
  let scale0 = MIN
  let lastX = 0
  let lastY = 0
  // image center on screen (= transform-origin), cached per gesture
  let cx = 0
  let cy = 0

  const img = () => node.querySelector('img')

  // point the next move's delta is measured against
  function rebase(x: number, y: number) {
    lastX = x
    lastY = y
  }

  function paint() {
    const el = img()

    if (el === null) return

    el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
  }

  function reset() {
    scale = MIN
    tx = ty = 0

    const el = img()

    if (el !== null) el.style.transform = ''
  }

  function dist(t: TouchList) {
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY)
  }

  function mid(t: TouchList) {
    return { x: (t[0].clientX + t[1].clientX) / 2, y: (t[0].clientY + t[1].clientY) / 2 }
  }

  // keep image edges from drifting past the viewport
  function clamp() {
    const el = img()

    if (el === null) return

    const x = Math.max(0, (el.clientWidth * scale - node.clientWidth) / 2)
    const y = Math.max(0, (el.clientHeight * scale - node.clientHeight) / 2)

    tx = Math.min(x, Math.max(-x, tx))
    ty = Math.min(y, Math.max(-y, ty))
  }

  function start(e: TouchEvent) {
    if (e.touches.length === 2) {
      const r = node.getBoundingClientRect()

      cx = r.left + r.width / 2
      cy = r.top + r.height / 2
      dist0 = dist(e.touches)
      scale0 = scale

      const m = mid(e.touches)

      rebase(m.x, m.y)
    } else rebase(e.touches[0].clientX, e.touches[0].clientY)
  }

  function move(e: TouchEvent) {
    if (e.touches.length >= 2) {
      e.preventDefault()

      // keep the content point under the fingers fixed (zoom toward the pinch focal point)
      const m = mid(e.touches)
      const px = (lastX - cx - tx) / scale
      const py = (lastY - cy - ty) / scale

      scale = Math.min(MAX, Math.max(MIN, (scale0 * dist(e.touches)) / dist0))
      tx = m.x - cx - scale * px
      ty = m.y - cy - scale * py
      rebase(m.x, m.y)
    } else if (scale > MIN) {
      e.preventDefault()

      const t = e.touches[0]

      tx += t.clientX - lastX
      ty += t.clientY - lastY
      rebase(t.clientX, t.clientY)
    } else return // 1 finger at fit scale: leave it as a tap so it bubbles up to close

    clamp()
    paint()
  }

  function end(e: TouchEvent) {
    if (e.touches.length === 1) {
      // dropped from pinch to single — rebase pan baseline
      rebase(e.touches[0].clientX, e.touches[0].clientY)
      scale0 = scale
    } else if (e.touches.length === 0 && scale <= MIN) reset()
  }

  // passive: false so move() can preventDefault — iOS WebView ignores touch-action
  // and otherwise hijacks the pinch as native page zoom
  node.addEventListener('touchstart', start, { passive: false })
  node.addEventListener('touchmove', move, { passive: false })
  node.addEventListener('touchend', end)
  node.addEventListener('touchcancel', end)

  if (!open) reset()

  return {
    update({ open }) {
      if (!open) reset()
    },
    destroy() {
      node.removeEventListener('touchstart', start)
      node.removeEventListener('touchmove', move)
      node.removeEventListener('touchend', end)
      node.removeEventListener('touchcancel', end)
    },
  }
}
