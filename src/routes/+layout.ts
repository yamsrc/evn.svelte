import { injectAnalytics } from '@vercel/analytics/sveltekit'
import { browser, dev } from '$app/environment'
import { rc as iam } from '@/iam/rc'
import { rc as realtime } from '@/realtime/rc'
import { rc as transmission } from '@/transmission/rc'

if (browser) {
  if (!dev)
    injectAnalytics({
      mode: 'production',
      debug: false,
    })

  iam()
  realtime()
  transmission()
}

export const trailingSlash = 'always'
