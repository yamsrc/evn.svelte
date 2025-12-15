import { injectAnalytics } from '@vercel/analytics/sveltekit'
import { browser, dev } from '$app/environment'
import { rc as iam } from '@/iam/rc'
import { rc as realtime } from '@/realtime/rc'

if (browser) {
  injectAnalytics({
    mode: dev ? 'development' : 'production',
    debug: false,
  })

  iam()
  realtime()
}

export const trailingSlash = 'always'
