import { connect } from '@toa.io/origin'
import { injectAnalytics } from '@vercel/analytics/sveltekit'
import { browser, dev } from '$app/environment'
import { origin } from '$config'
import { rc as iam } from '@/iam/rc'
import { rc as realtime } from '@/realtime/rc'

connect({
  origin,
  delay: dev ? 1000 : undefined,
})

console.info('Origin connected', origin)

if (browser) {
  injectAnalytics({
    mode: dev ? 'development' : 'production',
    debug: false,
  })

  iam()
  realtime()
}

export const trailingSlash = 'always'
