import type * as net from './net'

export interface Group extends Omit<net.Group, '_created' | '_version'> { }
