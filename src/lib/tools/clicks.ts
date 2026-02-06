/**
 * Creates a click detector for rapid consecutive clicks. Invoke the returned
 * function on each click; when `count` clicks occur within `gap` ms, `callback` runs.
 *
 * @param count - Required number of consecutive clicks to trigger the callback.
 * @param callback - Function to execute when the click count is reached.
 * @param gap - Maximum time in ms between clicks to count as consecutive. Default 500.
 * @returns A function to call on each click event.
 */
export function clicks(count: number, callback: () => void, gap = 500) {
  let taps = 0
  let last = 0

  return () => {
    const now = Date.now()

    taps = now - last < gap ? taps + 1 : 1
    last = now

    if (taps === count) {
      taps = 0
      callback()
    }
  }
}
