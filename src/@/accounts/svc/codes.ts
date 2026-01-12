import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function create(id: string): Promise<string | Error> {
  const me = ensure(account)
  const code = await net.codes.post(me.id, id)

  if (code instanceof Error)
    return code

  return code.code
}

export async function verify(identity: string, code: string): Promise<boolean | Error> {
  const challenge = btoa(`${identity}:${code}`)
  const echo = await net.identity.get(`OTP ${challenge}`)

  if (echo instanceof Error)
    return echo

  return echo.id === identity
}
