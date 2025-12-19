export function deterministic(id: string, max: number): number {
  let hash = 0

  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i)

    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return Math.abs(hash) % max
}
