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
}

export interface PingResponse {
  sent: number
  badge: number
}
