import { redirect } from '@sveltejs/kit'
import { get } from '@/accounts/svc/get'
import { dictionaries } from '$lib/intl/join'
import { acceptable } from '$lib/intl'
import { origin } from '$config/configuration'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async ({ params, request }) => {
  const account = await get(params.id)

  if (account instanceof Error)
    return redirect(302, '/')

  const locale = acceptable(request.headers.get('accept-language'))
  const dict = dictionaries[locale]
  const url = `${origin}/pictures/${account.picture}.150x150!.jpeg`

  return {
    account,
    meta: {
      title: dict.account.og.tile,
      description: dict.account.og.description(account.name),
      image: {
        url,
        width: 150,
        height: 150,
        type: 'image/jpg',
      },
    },
  }
}
