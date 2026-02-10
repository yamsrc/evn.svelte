import { it, expect } from 'vitest'
import { query } from './query.ts'

it('should build criteria', () => {
  const params = new URLSearchParams()

  params.set('foo', 'bar')
  params.set('baz', 'qux')

  const result = query(params)

  expect(result).toBe('?criteria=foo==bar;baz==qux')
})

it('should build empty criteria', () => {
  const params = new URLSearchParams()

  const result = query(params)

  expect(result).toBe('')
})

it('should separate known parameters', () => {
  const params = new URLSearchParams()

  params.set('foo', 'bar')
  params.set('omit', '10')
  params.set('limit', '20')
  params.set('search', 'qux')

  const result = query(params)

  expect(result).toBe('?criteria=foo==bar&omit=10&limit=20&search=qux')
})

it('should separate specified parameters', () => {
  const params = new URLSearchParams()

  params.set('foo', 'bar')
  params.set('baz', 'qux')

  const result = query(params, { separate: ['baz'] })

  expect(result).toBe('?criteria=foo==bar&baz=qux')
})
