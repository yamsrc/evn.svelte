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

export interface PingInput {
  identity: string
  fail?: boolean
}

export interface PingResponse {
  n: number
}
