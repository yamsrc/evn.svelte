import { redirect } from '@sveltejs/kit'
import { get } from '@/accounts/svc/get'
import { dictionaries } from '$lib/intl/join'
import { acceptable } from '$lib/intl'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async ({ params, request }) => {
  const inviter = await get(params.id)

  if (inviter instanceof Error)
    return redirect(302, '/')

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
