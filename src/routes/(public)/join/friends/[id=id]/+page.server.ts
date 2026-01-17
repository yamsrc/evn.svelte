import { acceptable } from '$lib/intl'
import { dictionaries } from '$lib/intl/join'
import { get } from '@/accounts/svc/get'
import { origin } from '@/net'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async ({ params, fetch, request }) => {
  origin.use(fetch)

  const inviter = await get(params.id)
  const locale = acceptable(request.headers.get('accept-language'))
  const dict = dictionaries[locale]

  return {
    inviter,
    meta: {
      title: dict.friends.og.title(inviter.name),
      description: dict.friends.og.description,
      image: {
        url: '/og/friends.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpg',
      },
    } satisfies App.PageData['meta'],
  }
}
