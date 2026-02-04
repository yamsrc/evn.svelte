import { isNative } from './detect'
import { fcm } from './fcm'
import { web } from './web'
import type { Channel } from './Channel'

export const channel: Channel = isNative() ? fcm : web
