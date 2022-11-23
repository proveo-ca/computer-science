import { LinkedListNode } from './linked-list-node.js'

export class LinkedList {
  head: LinkedListNode
  
  constructor() {
    this.head = null
  }

  insertAtHead(data) {
    const newNode = new LinkedListNode(data)
    if (this.head == null) {
      this.head = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
  }

  insertAtTail(node) {
    if (this.head == null) {
      this.head = node
    }
    let temp = this.head
    while (temp.next) {
      temp = temp.next
    }
    temp.next = node
  }

  createLinkedList(array) {
    array.reverse()
    for (let x = 0; x < array.length; x++) {
      this.insertAtHead(array[x])
    }
  }

  displayLinkedList(head) {
    let temp = head
    let s = ''
    while (temp) {
      s += temp.data
      temp = temp.next
      if (temp) {
        s += ', '
      }
    }
    return s
  }
}
