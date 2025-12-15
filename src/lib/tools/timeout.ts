import { readable } from 'svelte/store'

/**
 * Create a Readable<number> that counts down from ms to 0
 */
export function timeout(ms: number) {
  return readable(ms, (set) => {
    const then = Date.now()
    const interval = setInterval(() => tick(), 1000 / FPS)

    function tick() {
      const remaining = ms - (Date.now() - then)

      if (remaining > 0)
        set(remaining)
      else {
        set(0)
        clearInterval(interval)
      }
    }

    tick()

    return () => clearInterval(interval)
  })
}

const FPS = 24
