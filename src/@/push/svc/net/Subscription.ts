export interface Subscription {
  id: string
  channel: 'web' | 'dev' | 'apns' | 'fcm'
  endpoint: WebPushEndpoint | string // For web channel, it's WebPushEndpoint
}

export interface WebPushEndpoint {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export interface SubscribeInput {
  channel: 'web'
  endpoint: {
    endpoint: string
    keys: {
      p256dh: string
      auth: string
    }
  }
}

export interface SubscribeResponse {
  id: string
}

export interface UnsubscribeInput {
  ids: string[]
}

export interface PushPayload {
  id: string
  title?: string
  body?: string
  action?: string // URL to navigate to
  data?: Record<string, unknown>
  delivery?: {
    key?: string // Notification grouping key
    visibility?: 'alert' | 'data'
    priority?: 'low' | 'normal' | 'high' | 'time-sensitive'
    ttl?: number
  }
}
