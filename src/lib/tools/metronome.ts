import { readable } from 'svelte/store'

function metronome(interval = 1000) {
  return readable(Date.now(), (set) => {
    const id = setInterval(() => set(Date.now()), interval)

    return () => clearInterval(id)
  })
}

export { metronome }
