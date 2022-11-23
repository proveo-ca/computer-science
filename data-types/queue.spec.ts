import { describe, expect, it } from 'bun:test'
import { Queue } from './queue'

describe('Queue tests', () => {
  it('should create an empty Queue', () => {
    const myQueue = new Queue()
    expect(myQueue.size()).toBe(0)
    expect(myQueue.isEmpty()).toBe(true)
    expect(myQueue.getFront()).toBe(null)
  })
})
