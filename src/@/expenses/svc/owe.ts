import type { Participant } from './net'

export function owe(participants: Record<string, Participant>, id?: string) {
  if (!id) return 0

  const { paid = 0, amount = 0 } = participants[id]

  return paid - amount
}
