import { ensure } from 'svas'
import { account } from '@/iam'
import * as managed from './managed'
import * as net from './net'
import { update } from './update'

export const pictures = [
  'f89bea1dcfdb2f85c3d30a222233c841',
  '9dfe81f959245e5507cc9a1332be6a88',
  'b110d7fcbba4545b8513b8e5c86aa35b',
  'fd08f5ab83b9a60143c168a2123e6ca8',
  '1093b72283e6362c925e5455702815d4',
  'c1288f8347e3e35a838c949f0cce347b',
  '2ae897c0f472367c7981df74f7e7ed13',
  '0dd9f1eabc49f68a349427f5d818f61f',
  '280bbde52fc61f88e3f6558494663666',
  'f267c66731d799a9720be3a572b4681b',
  'aebfc5599550852cdbda1f0d998e42a8',
] as const

export function pickpic() {
  const i = Math.floor(Math.random() * pictures.length)

  return pictures[i]
}

export async function upload(identity: string, file: File): Promise<void | Error> {
  const entry = await net.pictures.post(file)

  if (entry instanceof Error)
    return entry

  const me = ensure(account)

  const updated = me.id === identity
    ? await update(identity, { picture: entry.id })
    : await managed.update(identity, { picture: entry.id })

  if (updated instanceof Error)
    return updated
}
