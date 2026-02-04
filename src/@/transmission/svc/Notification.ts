export interface Notification {
  id: string
  title?: string
  badge?: number
  body?: string
  action?: string
  data?: Record<string, unknown>
  delivery?: Delivery
}

export interface Delivery {
  key?: string
  visibility?: 'alert' | 'data'
  priority?: 'low' | 'normal' | 'high' | 'time-sensitive'
  ttl?: number
}
