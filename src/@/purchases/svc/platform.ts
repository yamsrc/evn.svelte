import { features } from '$config'
import { stripe } from './channel/stripe'
import { google } from './channel/google'
import { apple } from './channel/apple'
import type { Channel } from './channel/Channel'

export function channel(): Channel | null {
  if (features.apple) return apple

  if (features.google) return google

  if (features.stripe) return stripe

  return null
}
