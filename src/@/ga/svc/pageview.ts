export function pageview(url: URL): void {
  window.gtag?.('event', 'page_view', {
    page_path: url.pathname + url.search,
    page_location: url.href,
  })
}
