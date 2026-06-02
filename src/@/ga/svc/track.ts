export function track(event: string, data: Record<string, unknown>) {
  window.gtag?.('event', event, data)
}
