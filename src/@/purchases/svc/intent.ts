export type Intent = { kind: 'confirm'; session: string } | { kind: 'cancel' } | null

export function intent(session: string | null, checkout: string | null): Intent {
  if (session !== null) return { kind: 'confirm', session }

  if (checkout === 'cancel') return { kind: 'cancel' }

  return null
}
