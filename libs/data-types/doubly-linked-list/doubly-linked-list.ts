import { DoublyLinkedListNode } from '../doubly-linked-list-node/doubly-linked-list-node';

/**
 * Generic Doubly Linked List Implementation
 * Time Complexity: O(1) - insertAtHead, insertAtTail, removeHead, removeTail
 * Time Complexity: O(n) - search, removeByValue
 * Space Complexity: O(n) - where n is the number of elements
 */
export class DoublyLinkedList<T> {
  public head: DoublyLinkedListNode<T> | null;
  public tail: DoublyLinkedListNode<T> | null;
  public length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Check if the list is empty
   * @returns true if list is empty
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Get the size of the list
   * @returns number of elements in the list
   */
  size(): number {
    return this.length;
  }

  /**
   * Insert an element at the head of the list
   * @param data - element to insert
   */
  insertAtHead(data: T): void {
    const newNode = new DoublyLinkedListNode<T>(data);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.linkNext(this.head);
      this.head = newNode;
    }

    this.length++;
  }

  /**
   * Insert an element at the tail of the list
   * @param data - element to insert
   */
  insertAtTail(data: T): void {
    const newNode = new DoublyLinkedListNode<T>(data);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.linkNext(newNode);
      this.tail = newNode;
    }

    this.length++;
  }

  /**
   * Remove and return the element at the head
   * @returns the head element or null if empty
   */
  removeHead(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const data = this.head!.data;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = null;
    }

    this.length--;
    return data;
  }

  /**
   * Remove and return the element at the tail
   * @returns the tail element or null if empty
   */
  removeTail(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const data = this.tail!.data;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    }

    this.length--;
    return data;
  }

  /**
   * Get the head element without removing it
   * @returns the head element or null if empty
   */
  getHead(): T | null {
    return this.head?.data || null;
  }

  /**
   * Get the tail element without removing it
   * @returns the tail element or null if empty
   */
  getTail(): T | null {
    return this.tail?.data || null;
  }

  /**
   * Search for an element in the list
   * @param data - element to search for
   * @returns the node containing the element or null if not found
   */
  search(data: T): DoublyLinkedListNode<T> | null {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  /**
   * Remove the first occurrence of an element
   * @param data - element to remove
   * @returns true if element was removed, false if not found
   */
  removeByValue(data: T): boolean {
    const node = this.search(data);

    if (!node) {
      return false;
    }

    if (node === this.head) {
      this.removeHead();
    } else if (node === this.tail) {
      this.removeTail();
    } else {
      node.unlink();
      this.length--;
    }

    return true;
  }

  /**
   * Convert list to array
   * @returns array representation of the list
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  /**
   * Create a doubly linked list from an array
   * @param items - array of items to add to list
   * @returns new DoublyLinkedList instance
   */
  static fromArray<T>(items: T[]): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>();
    for (const item of items) {
      list.insertAtTail(item);
    }
    return list;
  }

  /**
   * Clear all elements from the list
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Get string representation of the list
   * @returns string representation
   */
  toString(): string {
    return `DoublyLinkedList(${this.length}): [${this.toArray().join(
      ' <-> '
    )}]`;
  }

  /**
   * Iterator for the list (head to tail)
   */
  *[Symbol.iterator](): Generator<T> {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  /**
   * Reverse iterator for the list (tail to head)
   */
  *reverseIterator(): Generator<T> {
    let current = this.tail;
    while (current) {
      yield current.data;
      current = current.prev;
    }
  }
}
