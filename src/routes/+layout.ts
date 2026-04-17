import { injectAnalytics } from '@vercel/analytics/sveltekit'
import { rc as transmission } from '@/transmission/rc'
import { rc as realtime } from '@/realtime/rc'
import { rc as iam } from '@/iam/rc'
import { rc as app } from '@/app/rc'
import { browser, dev } from '$app/environment'

if (browser) {
  if (!dev)
    injectAnalytics({
      mode: 'production',
      debug: false,
    })

  iam()
  realtime()
  transmission()
  app()
}

export const trailingSlash = 'always'
