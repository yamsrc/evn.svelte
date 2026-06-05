import { rc as transmission } from '@/transmission/rc'
import { rc as realtime } from '@/realtime/rc'
import { rc as purchases } from '@/purchases/rc'
import { rc as iam } from '@/iam/rc'
import { rc as app } from '@/app/rc'
import { browser } from '$app/environment'

if (browser) {
  iam()
  realtime()
  transmission()
  app()
  void purchases()
}

export const trailingSlash = 'always'
