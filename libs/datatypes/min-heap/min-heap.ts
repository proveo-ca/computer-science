import { Heap } from '../heap/heap';

/**
 * Min Heap Implementation
 * The root element is always the minimum element
 * Time Complexity: O(log n) - insert, extractMin
 * Time Complexity: O(1) - peekMin
 * Space Complexity: O(n) - where n is the number of elements
 */
export class MinHeap<T> extends Heap<T> {
  constructor(capacity: number = 100) {
    super(capacity);
  }

  /**
   * Compare function for min heap
   * @param a - first element
   * @param b - second element
   * @returns true if a is less than b
   */
  protected compare(a: T, b: T): boolean {
    return a < b;
  }

  /**
   * Peek at the minimum element
   * @returns the minimum element or undefined if empty
   */
  peekMin(): T | undefined {
    return this.peek();
  }

  /**
   * Extract the minimum element
   * @returns the minimum element
   * @throws Error if heap is empty
   */
  extractMin(): T {
    return this.extract();
  }

  /**
   * Create a min heap from an array
   * @param items - array of items to add to heap
   * @param capacity - optional capacity (defaults to items.length * 2)
   * @returns new MinHeap instance
   */
  static fromArray<T>(items: T[], capacity?: number): MinHeap<T> {
    const heap = new MinHeap<T>(capacity || items.length * 2);
    for (const item of items) {
      heap.insert(item);
    }
    return heap;
  }

  /**
   * Build a min heap from an array in O(n) time
   * @param items - array of items
   * @param capacity - optional capacity
   * @returns new MinHeap instance
   */
  static buildHeap<T>(items: T[], capacity?: number): MinHeap<T> {
    const heap = new MinHeap<T>(capacity || items.length * 2);
    heap.items = [...items];
    heap._size = items.length;

    // Start from the last non-leaf node and heapify down
    for (let i = Math.floor(heap._size / 2) - 1; i >= 0; i--) {
      heap.heapifyDown(i);
    }

    return heap;
  }

  /**
   * Get string representation of the min heap
   * @returns string representation
   */
  toString(): string {
    return `MinHeap(${this._size}): [${this.toArray().join(', ')}]`;
  }
}
