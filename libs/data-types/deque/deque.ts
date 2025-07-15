import { DoublyLinkedList } from '../doubly-linked-list/doubly-linked-list';
import { DoublyLinkedListNode } from '../doubly-linked-list-node/doubly-linked-list-node';

/**
 * Generic Double-Ended Queue (Deque) Implementation
 * Allows insertion and deletion at both ends
 * Time Complexity: O(1) - all operations
 * Space Complexity: O(n) - where n is the number of elements
 */
export class Deque<T> {
  private _items: DoublyLinkedList<T>;

  constructor() {
    this._items = new DoublyLinkedList<T>();
  }

  /**
   * Get the head node of the deque
   * @returns head node or null if empty
   */
  get head(): DoublyLinkedListNode<T> | null {
    return this._items.head;
  }

  /**
   * Get the tail node of the deque
   * @returns tail node or null if empty
   */
  get tail(): DoublyLinkedListNode<T> | null {
    return this._items.tail;
  }

  /**
   * Check if the deque is empty
   * @returns true if deque is empty
   */
  isEmpty(): boolean {
    return this._items.length === 0;
  }

  /**
   * Get the current size of the deque
   * @returns number of elements in the deque
   */
  size(): number {
    return this._items.length;
  }

  /**
   * Peek at the element at the head without removing it
   * @returns the head element or undefined if empty
   */
  peekAtHead(): T | undefined {
    return this._items.head?.data;
  }

  /**
   * Peek at the element at the tail without removing it
   * @returns the tail element or undefined if empty
   */
  peekAtTail(): T | undefined {
    return this._items.tail?.data;
  }

  /**
   * Insert an element at the head of the deque
   * @param element - element to insert
   */
  insertAtHead(element: T): void {
    this._items.insertAtHead(element);
  }

  /**
   * Insert an element at the tail of the deque
   * @param element - element to insert
   */
  insertAtTail(element: T): void {
    this._items.insertAtTail(element);
  }

  /**
   * Remove and return the element at the head
   * @returns the head element
   * @throws Error if deque is empty
   */
  extractHead(): T {
    if (this.isEmpty()) {
      throw new Error('Deque is empty - cannot extract from head');
    }
    return this._items.removeHead()!;
  }

  /**
   * Remove and return the element at the tail
   * @returns the tail element
   * @throws Error if deque is empty
   */
  extractTail(): T {
    if (this.isEmpty()) {
      throw new Error('Deque is empty - cannot extract from tail');
    }
    return this._items.removeTail()!;
  }

  /**
   * Clear all elements from the deque
   */
  clear(): void {
    this._items = new DoublyLinkedList<T>();
  }

  /**
   * Convert deque to array (head to tail order)
   * @returns array representation of deque
   */
  toArray(): T[] {
    return this._items.toArray();
  }

  /**
   * Create a deque from an array
   * @param items - array of items to add to deque
   * @returns new Deque instance
   */
  static fromArray<T>(items: T[]): Deque<T> {
    const deque = new Deque<T>();
    for (const item of items) {
      deque.insertAtTail(item);
    }
    return deque;
  }

  /**
   * Get string representation of the deque
   * @returns string representation
   */
  toString(): string {
    return `Deque(${this.size()}): [${this.toArray().join(', ')}]`;
  }

  /**
   * Iterator for the deque (head to tail)
   */
  *[Symbol.iterator](): Generator<T> {
    let current = this._items.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  /**
   * Reverse iterator for the deque (tail to head)
   */
  *reverseIterator(): Generator<T> {
    let current = this._items.tail;
    while (current) {
      yield current.data;
      current = current.prev;
    }
  }
}
