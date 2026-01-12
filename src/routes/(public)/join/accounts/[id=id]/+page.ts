import { get } from '@/accounts/svc/get'
import { origin } from '@/net'

export async function load({ params, fetch }) {
  origin.use(fetch)

  const account = await get(params.id)

  return { account }
}
