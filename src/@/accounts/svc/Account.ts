import type { Account as Net } from './net'

export type Account = Net & { deleted?: boolean }
