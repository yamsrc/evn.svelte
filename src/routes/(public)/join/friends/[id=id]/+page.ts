import { get } from '@/accounts/svc/get'
import { origin } from '@/net'

export async function load({ params, fetch }) {
  origin.use(fetch)

  const inviter = await get(params.id)

  return { inviter }
}
