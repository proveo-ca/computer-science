import { DoublyLinkedList } from '../doubly-linked-list/doubly-linked-list.js';

/**
 * Generic Queue Implementation using DoublyLinkedList
 * Follows FIFO (First In, First Out) principle
 * Time Complexity: O(1) - enqueue, dequeue, peek, isEmpty
 * Space Complexity: O(n) - where n is the number of elements
 */
export class Queue<T> {
  private _items: DoublyLinkedList<T>;

  constructor() {
    this._items = new DoublyLinkedList<T>();
  }

  /**
   * Remove and return the front element from the queue
   * @returns the front element
   * @throws Error if queue is empty
   */
  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty - cannot dequeue');
    }
    return this._items.removeHead()!;
  }

  /**
   * Add an element to the rear of the queue
   * @param element - element to add
   */
  enqueue(element: T): void {
    this._items.insertAtTail(element);
  }

  /**
   * Return the front element without removing it
   * @returns the front element or undefined if queue is empty
   */
  peek(): T | undefined {
    return this._items.head?.data;
  }

  /**
   * Return the front element without removing it (alias for peek)
   * @returns the front element or undefined if queue is empty
   */
  front(): T | undefined {
    return this.peek();
  }

  /**
   * Get the current size of the queue
   * @returns number of elements in the queue
   */
  size(): number {
    return this._items.length;
  }

  /**
   * Check if the queue is empty
   * @returns true if queue is empty
   */
  isEmpty(): boolean {
    return this._items.length === 0;
  }

  /**
   * Clear all elements from the queue
   */
  clear(): void {
    this._items.clear();
  }

  /**
   * Convert queue to array (front to rear order)
   * @returns array representation of queue
   */
  toArray(): T[] {
    return this._items.toArray();
  }

  /**
   * Create a queue from an array
   * @param items - array of items to add to queue
   * @returns new Queue instance
   */
  static fromArray<T>(items: T[]): Queue<T> {
    const queue = new Queue<T>();
    for (const item of items) {
      queue.enqueue(item);
    }
    return queue;
  }

  /**
   * Get string representation of the queue
   * @returns string representation
   */
  toString(): string {
    return `Queue(${this.size()}): [${this.toArray().join(', ')}]`;
  }

  /**
   * Iterator for the queue (front to rear)
   */
  *[Symbol.iterator](): Iterator<T> {
    for (const item of this._items) {
      yield item;
    }
  }
}
