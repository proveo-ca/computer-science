import { LinkedListNode } from './linked-list-node'

class GeneratorLinkedList {
  head = null

  append (value) {
    const node = new LinkedListNode(value)

    if (!this.head) {
      this.head = node
    } else {
      const old = this.head
      node.next = old
      this.head = node
    }
  }

  * values () {
    let current = this.head

    while (current) {
      yield current.value
      current = current.next
    }
  }
}

export { GeneratorLinkedList }

// const list = new GeneratorLinkedList()
// list.append('hue')
// list.append('kek')
//
// console.log(Array.from(list.values()))
