import { ensure, ok, once } from 'svas'
import { account } from '@/iam'
import { progress, receipts } from './store'
import * as net from './net'
import type { Receipt } from './Receipt'
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

  emitter.on('create', (receipt) => {
    if (receipt instanceof Error)
      return error(receipt)

    update(thread, {
      status: 'processing',
      receipt: receipt.id,
    })

    once(receipts, ($receipts) => ok($receipts) && done($receipts, receipt.id))
      .then(() => update(thread, {
        status: 'ready',
      }))
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

function done(receipts: Receipt[], id: string): boolean {
  const receipt = receipts.find((r) => r.id === id)

  return receipt !== undefined && receipt.status !== 'pending'
}
