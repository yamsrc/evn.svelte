import { origin, type OctetsEntry, type Faulty } from '@/net'
import type { Emitter } from 'mitt'
import type { Receipt } from './Receipt'

const receipts = origin.resource<Receipt>('/receipts/', { credentials: 'include' })

export async function post(
  identity: string,
  file: File,
): Promise<[OctetsEntry, Emitter<Workflow>] | Error> {
  return await receipts.octets<Workflow>(identity, {
    method: 'POST',
    body: file,
  })
}

export async function get(identity: string): Promise<Receipt[] | Error> {
  return await receipts.json<Receipt[]>(identity)
}

export const receipt = {
  get: async (identity: string, id: string): Promise<Receipt | Error> => {
    return await receipts.json<Receipt>(`${identity}/${id}`)
  },

  put: async (identity: string, id: string, body: ReceiptPut): Promise<Receipt | Error> => {
    return await receipts.json<Receipt>(`${identity}/${id}`, {
      method: 'PUT',
      body,
    })
  },
}

export type ClaimsChangeset = Record<string, Array<boolean | null>>

export interface ReceiptPut {
  identity: string
  claims: ClaimsChangeset
  done?: boolean
}

type Workflow = Faulty<{ create: { id: string, picture: string } }>
