import { LinkedListNode } from 'data-types/linked-list-node'

interface IDeleteNodeOptions {
  key?: string
}

export function deleteNode(head: LinkedListNode, target: string | number, options: IDeleteNodeOptions = {}): LinkedListNode {
  const { key } = options
  let prev = null
  let current = head

  while (current) {
    const matcher = key ? current.data[key] : current.data

    if (matcher === target) {
      // Delete the node if it matches the key
      if (current === head) {
        head = head.next
        current = head
      } else {
        // If key is present in the node other than the head node
        prev.next = current.next
        current = current.next
      }
    } else {
      // Move next if no key found
      prev = current
      current = current.next
    }
  }
  return head
}