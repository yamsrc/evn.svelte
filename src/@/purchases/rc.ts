import { track } from '@/ga'
import { fragment, strip } from '$lib/tools'
import { open, step } from './ui/store'
import * as stripe from './svc/stripe'
import { intent } from './svc/intent'

export async function rc(): Promise<void> {
  const action = intent(fragment('session_id'), fragment('checkout'))

  if (action === null) return

  if (action.kind === 'cancel') {
    step.set('offer')
    open.set(true)
    strip()

    return
  }

  const res = await stripe.transactions.confirm(action.session)

  strip()

  if (res instanceof Error) {
    console.error('Stripe return confirmation failed', res)

    return
  }

  track('purchases.completed', { method: 'stripe' })
  step.set('complete')
  open.set(true)
}
