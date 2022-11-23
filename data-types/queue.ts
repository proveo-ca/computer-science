import { DoublyLinkedList } from './doubly-linked-list.js'

class Queue<T> {
  items: DoublyLinkedList

  constructor() {
    this.items = new DoublyLinkedList()
  }

  dequeue(): T {
    return this.items.removeHead() as T
  }

  enqueue(data: T): void {
    this.items.insertAtTail(data)
  }

  isEmpty() {
    return this.items.length == 0
  }

  getFront(): T {
    if (!(this.isEmpty())) {
      return this.items.getHead() as T
    } else
      return null
  }

  size() {
    return this.items.length
  }
}

export { Queue }