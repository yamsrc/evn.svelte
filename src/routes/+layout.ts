import { injectAnalytics } from '@vercel/analytics/sveltekit'
import { browser, dev } from '$app/environment'
import { rc as iam } from '@/iam/rc'
import { rc as push } from '@/push/rc'
import { rc as realtime } from '@/realtime/rc'

if (browser) {
  if (!dev)
    injectAnalytics({
      mode: 'production',
      debug: false,
    })

  iam()
  push()
  realtime()
}

export const trailingSlash = 'always'
