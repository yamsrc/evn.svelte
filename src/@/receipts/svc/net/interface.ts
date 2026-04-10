import { origin, type OctetsEntry, type Faulty } from '@/net'
import type { Emitter } from 'mitt'
import type { Receipt } from './Receipt'
import type { Invitation } from './Invitation'

const receipts = origin.resource<Receipt>('/receipts/', { credentials: 'include' })

type Workflow = Faulty<{ create: { id: string, picture: string } }>

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

export type ReceiptPut = { identity: string } & ({
  claims: ClaimsChangeset
  done?: boolean
} | {
  done: false
})

export type ClaimsChangeset = Record<string, Array<boolean | null>>

export interface ReceiptPost {
  participants: string[]
}

export type Assign = { autolock: string | null }

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

  post: async (identity: string, id: string, body: ReceiptPost): Promise<Receipt | Error> => {
    return await receipts.json<Receipt>(`${identity}/${id}`, {
      method: 'POST',
      body,
    })
  },

  del: async (identity: string, id: string, actor: string): Promise<Receipt | Error> => {
    return await receipts.json<Receipt>(`${identity}/${id}/${actor}`, {
      method: 'DELETE',
    })
  },

  patch: async (identity: string, id: string, body: Assign): Promise<Receipt | Error> => {
    return await receipts.json<Receipt>(`${identity}/${id}`, {
      method: 'PATCH',
      body,
    })
  },

  lock: async (identity: string, id: string): Promise<Receipt | Error> => {
    return await receipts.json<Receipt>(`${identity}/${id}`, {
      method: 'LOCK',
    })
  },
}

export const invitations = {
  resource: origin.resource<Invitation>('/receipts/invitations/'),
  get: (id: string) => invitations.resource.json(id),
  del: (id: string) =>
    invitations.resource.json(id, { method: 'DELETE', credentials: 'include' }),
}

export const claims = {
  del: async (identity: string, id: string): Promise<Receipt | Error> => {
    return await receipts.json<Receipt>(`${identity}/${id}/claims`, {
      method: 'DELETE',
    })
  },
}

export const extras = {
  patch: async (identity: string, id: string, extraId: string, body: { included: boolean }): Promise<Receipt | Error> => {
    return await receipts.json<Receipt>(`${identity}/${id}/extras/${extraId}`, {
      method: 'PATCH',
      body,
    })
  },
}
