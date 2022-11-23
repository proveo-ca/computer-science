import { describe, expect, it } from 'bun:test'
import { DoublyLinkedList } from 'data-types'
import { deleteNode } from './delete-node-from-linked-list'

describe('deleteNode tests', () => {
  it('should delete the value when found', () => {
    const list = new DoublyLinkedList()
    list.populate([1, 2, 3, -1, 10, 12])

    deleteNode(list.head, 2)
    expect(list.display().toString()).toBe('1,3,-1,10,12')
  })
  it('should do nothing if the value is no found', () => {
    const list = new DoublyLinkedList()
    list.populate([1, 2, 3, -1, 10, 12])

    deleteNode(list.head, -12)
    expect(list.display().toString()).toBe('1,2,3,-1,10,12')
  })
  it('should delete the value when found (using matcher)', () => {
    const list = new DoublyLinkedList()
    list.populate([
      { id: 'a', value: 1, },
      { id: 'b', value: 2 },
      { id: 'c', value: 3 }
    ])

    deleteNode(list.head, 'b', { key: 'id' })
    const result = JSON.stringify(list.display())
    expect(result).toBe(`["{\\"id\\":\\"a\\",\\"value\\":1}","{\\"id\\":\\"c\\",\\"value\\":3}"]`)
  })
})