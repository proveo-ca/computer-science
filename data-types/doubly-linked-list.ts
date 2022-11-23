import { LinkedListNode } from './linked-list-node.js'

class DoublyLinkedList {
  length: number
  head: LinkedListNode
  tail: LinkedListNode

  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }

  insertAtHead(data) {
    const newNode = new LinkedListNode(data)
    if (this.head == null) {
      this.head = newNode
    } else {
      this.head.prev = newNode
      newNode.next = this.head
      this.head = newNode
    }
  }

  // Add node to the end of the list
  insertAtTail(data) {
    const newNode = new LinkedListNode(data)

    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.length++

    return newNode
  }

  // Remove node from the beginning of the list
  removeHead() {
    if (this.length === 0) {
      return null
    }
    const nodeToRemove = this.head

    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = nodeToRemove.next

      this.head.prev = null
      nodeToRemove.next = null
    }
    this.length--

    return nodeToRemove.data
  }

  getHead() {
    if (!(this.head == null)) {
      return this.head.data
    } else
      return null
  }

  display() {
    const list = []
    let currentNode = this.head

    while (currentNode !== undefined) {
      list.push(JSON.stringify(currentNode.data))
      currentNode = currentNode.next
    }

    return list
  }

  populate(array: any[]) {
    for (let i = 0; i < array.length; i++) {
      this.insertAtTail(array[i])
    }
  }
}

export { DoublyLinkedList }
