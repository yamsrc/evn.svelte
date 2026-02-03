export interface WebPushEndpoint {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export interface SubscribeInput {
  channel: 'web'
  endpoint: WebPushEndpoint
}

export interface SubscribeResponse {
  id: string
}

export interface PingResponse {
  sent: number
  badge: number
}
