import { Heap } from '../heap/heap';

/**
 * Max Heap Implementation
 * The root element is always the maximum element
 * Time Complexity: O(log n) - insert, extractMax
 * Time Complexity: O(1) - peekMax
 * Space Complexity: O(n) - where n is the number of elements
 */
export class MaxHeap<T> extends Heap<T> {
  constructor(capacity: number = 100) {
    super(capacity);
  }

  /**
   * Compare function for max heap
   * @param a - first element
   * @param b - second element
   * @returns true if a is greater than b
   */
  protected compare(a: T, b: T): boolean {
    return a > b;
  }

  /**
   * Peek at the maximum element
   * @returns the maximum element or undefined if empty
   */
  peekMax(): T | undefined {
    return this.peek();
  }

  /**
   * Extract the maximum element
   * @returns the maximum element
   * @throws Error if heap is empty
   */
  extractMax(): T {
    return this.extract();
  }

  /**
   * Create a max heap from an array
   * @param items - array of items to add to heap
   * @param capacity - optional capacity (defaults to items.length * 2)
   * @returns new MaxHeap instance
   */
  static fromArray<T>(items: T[], capacity?: number): MaxHeap<T> {
    const heap = new MaxHeap<T>(capacity || items.length * 2);
    for (const item of items) {
      heap.insert(item);
    }
    return heap;
  }

  /**
   * Build a max heap from an array in O(n) time
   * @param items - array of items
   * @param capacity - optional capacity
   * @returns new MaxHeap instance
   */
  static buildHeap<T>(items: T[], capacity?: number): MaxHeap<T> {
    const heap = new MaxHeap<T>(capacity || items.length * 2);
    heap.items = [...items];
    heap._size = items.length;

    // Start from the last non-leaf node and heapify down
    for (let i = Math.floor(heap._size / 2) - 1; i >= 0; i--) {
      heap.heapifyDown(i);
    }

    return heap;
  }

  /**
   * Get string representation of the max heap
   * @returns string representation
   */
  toString(): string {
    return `MaxHeap(${this._size}): [${this.toArray().join(', ')}]`;
  }
}
