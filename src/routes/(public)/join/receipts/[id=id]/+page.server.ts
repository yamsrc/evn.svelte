import { redirect } from '@sveltejs/kit'
import { invitations } from '@/receipts'
import { get } from '@/accounts'
import { dictionaries } from '$lib/intl/join'
import { acceptable } from '$lib/intl'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async ({ params, request }) => {
  const receipt = await invitations.get(params.id)

  if (receipt instanceof Error)
    return redirect(302, '/')

  const inviter = await get(receipt.identities[0])
  const locale = acceptable(request.headers.get('accept-language'))
  const dict = dictionaries[locale]

  return {
    receipt,
    inviter: inviter instanceof Error ? undefined : inviter,
    meta: {
      title: dict.receipts.og.title(receipt.title),
      description: dict.receipts.og.description,
      image: {
        url: '/og/group.jpg', // TODO: receipt image
        width: 1200,
        height: 630,
        type: 'image/jpg',
      },
    } satisfies App.PageData['meta'],
  }
}
