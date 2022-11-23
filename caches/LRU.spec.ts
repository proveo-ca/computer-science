import { describe, expect, it } from 'bun:test'
import { LRU } from './LRU.js'
import { ALL_COLORS, BASIC_COLORS } from './seeds/COLORS'

it('should handle non-numeric inputs for capacity', () => {
  try {
    new LRU(null)
  } catch(e) {
    expect(e)
  }
})

it('should place the latest accessed record on top', () => {
  const LRUCache = new LRU(4)
  LRUCache.register('00f', 'blue')
  LRUCache.register('0f0', 'green')
  LRUCache.register('f00', 'red')

  const cacheRegistry = LRUCache.display()
  expect(cacheRegistry).toContain(BASIC_COLORS)
})

it('should evict the earliest accessed record once the limit has been reached', () => {
  const LRUCache = new LRU(6)
  LRUCache.register('00f', 'blue')
  LRUCache.register('0f0', 'green')
  LRUCache.register('f00', 'red')
  LRUCache.register('000', 'key')
  LRUCache.register('ff0', 'yellow')
  LRUCache.register('f0f','magenta')
  LRUCache.register('0ff', 'cyan')

  const cacheRegistry = LRUCache.display()
  expect(cacheRegistry).toContain([
    { '0ff': 'cyan' },
    { 'f0f': 'magenta' },
    { 'ff0': 'yellow' },
    { '000': 'key' },
    { 'f00': 'red' },
    { '0f0': 'green' },
  ])
})

it('should update an accessed record, and avoid duplicates', () => {
  const LRUCache = new LRU(10)
  LRUCache.register(ALL_COLORS)
  LRUCache.register({ 'f00': 'red' })

  const cacheRegistry = LRUCache.display()
  expect(cacheRegistry).toContain([
    { 'f00': 'red' },
    { '0f0': 'green' },
    { '00f': 'blue' },
    { '0ff': 'cyan' },
    { 'f0f': 'magenta' },
    { 'ff0': 'yellow' },
    { '000': 'key' }
  ])
})
