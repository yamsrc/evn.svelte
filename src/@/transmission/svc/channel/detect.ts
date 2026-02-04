export const isNative = () =>
  typeof window !== 'undefined' && Boolean(window.webkit?.messageHandlers?.['push-token'])

export const supported = () => typeof Notification !== 'undefined' || isNative()
