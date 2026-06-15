import { shell } from '@/shell'
import { features } from '$config'
import { stripe } from './channel/stripe'
import { bridge } from './channel/shell'
import { apple } from './channel/apple'
import type { Channel } from './channel/Channel'

export function channel(): Channel | null {
  if (features.apple && shell.available()) return bridge

  if (features.apple) return apple

  if (features.stripe) return stripe

  return null
}
