import * as net from './net'
import type { Code } from './net'

export async function create(properties: net.Post): Promise<Code | Error> {
  return net.create(properties)
}
