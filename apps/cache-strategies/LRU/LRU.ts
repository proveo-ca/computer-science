import { DoublyLinkedList } from '@proveo/cs-datatypes'
import { deleteNode } from '@proveo/cs-algorithms'
// Least Recent Use
// 1. Whenever a record is accessed, it's placed at the top of the cache.
// 2. Records at the bottom will be removed once the limit is reached.
// 3. This algorithm is considered expensive, because every record must be mapped to a date/time of access.

//  Featuring data-types:
// Double Linked List (registry: eviction / capacity management)
// Hash Table (search / updating)
function LRU(this: any, capacity = 100) {
  if (typeof capacity !== 'number') {
    throw new Error(
      `LRU must be instantiated with a capacity length, got called with: ${capacity}`
    );
  }

  this.capacity = capacity;
  this.cacheRegistry = new DoublyLinkedList();
  this.cacheMap = new Map();
}

LRU.prototype.getByKey = function (key: string) {
  if (this.cacheMap.has(key)) {
    const listNode = this.cacheMap.get(key);
    // Remove the node on both ends
    listNode.prev.next = listNode.next;
    listNode.next.prev = listNode.prev;

    this.cacheRegistry.insertAtTail(listNode);

    return listNode.value;
  } else {
    return null;
  }
};

LRU.prototype.register = function (key: string | number, data: any) {
  this.cacheRegistry.insertAtTail({ key, data });

  if (this.getByKey(key) !== -1) {
    deleteNode(this.cacheRegistry.head, key, { key: 'key' });
  }

  if (this.cacheMap.size > this.capacity) {
    const bottomNode = this.cacheRegistry.getHead();
    this.cacheRegistry.removeHead();
    this.cacheMap.delete(bottomNode.key);
  }

  this.cacheMap.set(key, { key, data });
};

LRU.prototype.display = function () {
  if (this.capacity > 100) {
    throw new Error(`Cache registry too big to print (over 100 capacity): ${this.capacity}`)
  }

  return []
}

export { LRU }
