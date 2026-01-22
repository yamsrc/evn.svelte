import { origin, type OctetsEntry, type Faulty } from '@/net'
import type { Expense } from './Expense'
import type { Emitter } from 'mitt'

const expenses = origin.resource<Expense>('/expenses/', { credentials: 'include' })

export async function post(identity: string, file: File): Promise<OctetsEntry | Error>
export async function post(identity: string, file: File, id: string): Promise<[OctetsEntry, Emitter<Workflow>] | Error>

export async function post(identity: string, file: File, id?: string): Promise<OctetsEntry | [OctetsEntry, Emitter<Workflow>] | Error> {
  if (id === undefined)
    return await expenses.json<OctetsEntry>(`${identity}/attachments/`, { method: 'POST', body: file, credentials: 'include' })
  else
    return await expenses.octets<Workflow>(`${identity}/${id}/attachments/`, { method: 'POST', body: file, credentials: 'include' })
}

type Workflow = Faulty<{ attach: Expense }>
