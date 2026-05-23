import type { PageServerLoad } from './$types'

export const load: PageServerLoad = ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=3600',
  })
}
