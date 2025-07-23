import { describe, expect, it } from 'bun:test'
import { cuckooHashing } from './cuckoo-hashing'

describe('Cuckoo hashing tests', () => {
  it('should do a thing', () => {
    const keys_1 = [
      20, 50, 53, 75, 100,
      67, 105, 3, 36, 39
    ]

    const n = keys_1.length

    cuckooHashing(keys_1, n)
  })

  it('should do a thing', () => {
    /* following array has a cycle and hence we will
     have to rehash to position every key */
    const keys_2 = [
      20, 50, 53, 75, 100,
      67, 105, 3, 36, 39, 6
    ]

    const m = keys_2.length

    cuckooHashing(keys_2, m)
  })
})
