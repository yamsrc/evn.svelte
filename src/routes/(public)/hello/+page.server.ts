import { acceptable } from '$lib/intl'
import { dictionaries } from './intl/built.js'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = ({ request, setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=3600',
  })

  const dict = dictionaries[acceptable(request.headers.get('accept-language'))]

  return {
    meta: {
      title: dict.meta.title,
      description: dict.meta.description,
      keywords: dict.meta.keywords,
      image: {
        url: '/og/app.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpg',
      },
    } satisfies App.PageData['meta'],
  }
}
