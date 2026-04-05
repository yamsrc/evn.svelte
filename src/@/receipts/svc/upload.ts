import { writable, type Readable, type Writable } from 'svelte/store'
import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export function upload(file: File): Readable<Progress> {
  const progress = writable<Progress>({ status: 'uploading', since: Date.now() })

  const me = ensure(account)

  net.post(me.id, file).then((uploaded) => {
    if (uploaded instanceof Error)
      return set(progress, { status: 'failed', error: uploaded })

    const [entry, emitter] = uploaded

    set(progress, { status: 'creating', picture: entry.id })

    emitter.on('create', function handle(receipt) {
      emitter.off('create', handle)

      if (receipt instanceof Error)
        return set(progress, { status: 'failed', error: receipt })

      set(progress, {
        status: 'created',
        receipt: receipt.id,
      })
    })
  })

  return progress
}

function set(progress: Writable<Progress>, tobe: Partial<Progress>) {
  progress.update((asis) => Object.assign(asis, tobe))

  return progress
}

interface Uploading {
  status: 'uploading'
  since: number
}

interface Creating extends Omit<Uploading, 'status'> {
  status: 'creating'
  picture: string
}

export interface Created extends Omit<Creating, 'status'> {
  status: 'created'
  receipt: string
}

interface Failed extends Omit<Creating, 'status'> {
  status: 'failed'
  error: Error
}

export type Progress = Uploading | Creating | Created | Failed
