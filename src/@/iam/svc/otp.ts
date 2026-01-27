import * as net from './net'
import { method, iam } from './store'
import type { Echo } from './net'

export async function send(email: string): Promise<void | Error> {
  return net.otp.post({ email })
}

export async function add(identity: string, email: string): Promise<void | Error> {
  return await net.otp.post(identity, { email })
}

export async function verify(username: string, otp: string): Promise<Echo | Error> {
  const credentials = btoa(`${username}:${otp}`)
  const echo = await net.get('OTP ' + credentials)

  if (echo instanceof Error) return echo

  iam(echo)
  method.set('password')

  return echo
}
