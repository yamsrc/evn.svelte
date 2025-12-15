import * as origin from './net'
import { method, iam } from './store'

async function send(email: string): Promise<void | Error> {
  return origin.otp.post({ email })
}

async function verify(username: string, otp: string): Promise<void | Error> {
  const credentials = btoa(`${username}:${otp}`)
  const echo = await origin.get('OTP ' + credentials)

  if (echo instanceof Error) return echo

  iam(echo)
  method.set('password')
}

export { send, verify }
