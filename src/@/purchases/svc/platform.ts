import { shell, ios } from '$lib/tools/mq'
import { apple } from './channel/apple'
import type { Channel } from './channel/Channel'

export function channel(): Channel | null {
  if (shell && ios) return apple

  return null
}
