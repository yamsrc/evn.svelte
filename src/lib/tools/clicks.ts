export function clicks(count: number, callback: () => void, gap = 500) {
  let taps = 0
  let last = 0

  return () => {
    const now = Date.now()

    taps = now - last < gap ? taps + 1 : 1
    last = now

    if (taps >= count) {
      taps = 0
      callback()
    }
  }
}
