import type { ScopeKey } from '../Scope'

export type Permissions = Partial<Record<ScopeKey, boolean>>

export interface WebPushEndpoint {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export type SubscribeInput =
  | { channel: 'web'; endpoint: WebPushEndpoint }
  | { channel: 'fcm'; endpoint: string }

export interface SubscribeResponse {
  id: string
  permissions: Permissions
}

export interface ConfigureInput {
  permissions: Permissions
}

export interface PingResponse {
  sent: number
  badge: number
}
