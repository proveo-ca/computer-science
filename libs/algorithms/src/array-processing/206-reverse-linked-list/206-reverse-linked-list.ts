import { LinkedListNode } from 'libs/data-types/doubly-linked-list-node'
import { LinkedList } from 'data-types/linked-list'

function reverseHead (head) {
  if (!head || !head.next) {
    return head
  }
  let tail = new LinkedListNode(head.data)
  let reversedHead = null
  let currentNode = head.next

  while (currentNode) {
    reversedHead = new LinkedListNode(currentNode.data)
    reversedHead.next = tail

    tail = reversedHead
    currentNode = currentNode.next
  }

  return reversedHead
}

const reverse = function (head) {
  const originalList = new LinkedList()
  originalList.head = head

  const reversedHead = reverseHead(head)

  const reversedList = new LinkedList()
  reversedList.head = reversedHead

  return head
}

const head = new LinkedListNode(1)
const node1 = new LinkedListNode(2)
head.next = node1
const node2 = new LinkedListNode(3)
node1.next = node2
const node3 = new LinkedListNode(4)
node2.next = node3

reverse(head)
