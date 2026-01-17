import { redirect } from '@sveltejs/kit'
import { acceptable } from '$lib/intl'
import { dictionaries } from '$lib/intl/join'
import { get } from '@/accounts'
import { invitations } from '@/groups'
import type { PageServerLoad } from './$types.js'

const MAX_NAMES = 7

export const load: PageServerLoad = async ({ params, fetch, request }) => {
  const group = await invitations.get(params.id)

  if (group instanceof Error)
    return redirect(302, '/')

  const locale = acceptable(request.headers.get('accept-language'))
  const dict = dictionaries[locale]

  const accounts = await Promise.all(group.identities.map((id) => get(id)))

  const names = accounts
    .filter((account) => !(account instanceof Error))
    .map((account) => account.name)
    .sort(() => Math.random() - 0.5)

  if (names.length > MAX_NAMES)
    names.splice(0, names.length - MAX_NAMES)

  return {
    group,
    meta: {
      title: dict.group.og.title(group.name),
      description: dict.group.og.description(names),
      image: {
        url: '/og/group.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpg',
      },
    } satisfies App.PageData['meta'],
  }
}
