import { browser, dev } from '$app/environment'

export function pageview(url: URL): void {
  if (!browser || dev) return

  window.gtag?.('event', 'page_view', {
    page_path: url.pathname + url.search,
    page_location: url.href,
  })
}
