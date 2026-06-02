export function pageview(url: URL): void {
  if (window.gtag !== undefined)
    window.gtag?.('event', 'page_view', {
      page_path: url.pathname + url.search,
      page_location: url.href,
    })
  else console.debug('ga:pageview', url.href)
}
