import { ensure } from 'svas'
import { account } from '@/iam'
import { progress } from './store'
import * as net from './net'
import type { Progress } from './Progress'

export async function upload(file: File) {
  const thread = crypto.randomUUID()

  set({ thread, status: 'uploading', since: Date.now() })

  const me = ensure(account)
  const uploaded = await net.post(me.id, file)

  if (uploaded instanceof Error)
    return error(uploaded)

  const [entry, emitter] = uploaded

  update(thread, { status: 'creating', picture: entry.id })

  emitter.on('create', function handle(receipt) {
    emitter.off('create', handle)

    if (receipt instanceof Error)
      return error(receipt)

    update(thread, {
      status: 'created',
      receipt: receipt.id,
    })
  })
}

function set(status: Progress) {
  progress.set(status)
}

function update(thread: string, status: Partial<Progress>) {
  progress.update((asis) => {
    if (asis?.thread !== thread) // overlaped
      return asis

    return { ...asis, ...status } as Progress
  })
}

function error(error: Error) {
  progress.set(null)

  console.error(error)

  return error
}
