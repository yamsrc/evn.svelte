import type { Extra, Participant } from './net'

export function owe(participants: Record<string, Participant>, extras: Extra[], id?: string) {
  if (id === undefined) return 0

  const { paid = 0, amount = 0 } = participants[id]

  return paid - amount - (extras[0]?.amount ?? 0) / Object.keys(participants).length
}
