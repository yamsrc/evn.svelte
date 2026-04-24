const HEX32 = /^[0-9a-f]{32}$/i

export function toUuid(hex32: string): string {
  if (!HEX32.test(hex32)) throw new Error(`toUuid: expected 32-hex, got ${hex32}`)

  const h = hex32.toLowerCase()

  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`
}
