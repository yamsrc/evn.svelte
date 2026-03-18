import { redirect } from '@sveltejs/kit'
import { acceptable } from '$lib/intl'
import { dictionaries } from '$lib/intl/join'
import { get } from '@/accounts'
import { invitations } from '@/adventures'
import { url } from '@/media/ui/Picture'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, request }) => {
  const adventure = await invitations.get(params.id)

  if (adventure instanceof Error)
    return redirect(302, '/')

  const inviter = await get(adventure.identities[0])
  const locale = acceptable(request.headers.get('accept-language'))
  const dict = dictionaries[locale]
  const cover = url({ id: adventure.picture, path: '/pictures/', variant: '600x400!', format: 'jpeg' })

  return {
    adventure,
    inviter: inviter instanceof Error ? undefined : inviter,
    meta: {
      title: dict.adventures.og.title(adventure.title),
      description: dict.adventures.og.description,
      image: {
        url: cover,
        width: 600,
        height: 400,
        type: 'image/jpg',
      },
    } satisfies App.PageData['meta'],
  }
}
