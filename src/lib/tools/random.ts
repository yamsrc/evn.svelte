export function deterministic(id: string, max: number): number {
  if (max <= 0) return 0

  if (id.length === 0) return 0

  let hash = 0

  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i)

    hash = ((hash << 5) - hash + char) | 0 // djb2 hash with 32-bit conversion
  }

  return Math.abs(hash) % max
}
