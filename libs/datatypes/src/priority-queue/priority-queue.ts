import { Heap } from '../heap/heap.js';

/**
 * Priority Node for Priority Queue
 */
export interface PriorityNode<T> {
  data: T;
  priority: number;
}

/**
 * Abstract Priority Queue Implementation
 * Time Complexity: O(log n) - enqueue, dequeue
 * Time Complexity: O(1) - peek, isEmpty
 * Space Complexity: O(n) - where n is the number of elements
 */
export abstract class PriorityQueue<T> {
  protected heap: Heap<PriorityNode<T>>;

  constructor(capacity: number = 100) {
    this.heap = this.createHeap(capacity);
  }

  /**
   * Abstract method to create the appropriate heap type
   * @param capacity - heap capacity
   * @returns heap instance
   */
  protected abstract createHeap(capacity: number): Heap<PriorityNode<T>>;

  /**
   * Check if the priority queue is empty
   * @returns true if empty
   */
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }

  /**
   * Get the current size of the priority queue
   * @returns number of elements
   */
  size(): number {
    return this.heap.size();
  }

  /**
   * Add an element with priority to the queue
   * @param data - element to add
   * @param priority - priority of the element
   */
  enqueue(data: T, priority: number): void {
    this.heap.insert({ data, priority });
  }

  /**
   * Remove and return the highest priority element
   * @returns the highest priority element
   * @throws Error if queue is empty
   */
  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Priority queue is empty - cannot dequeue');
    }
    return this.heap.extract().data;
  }

  /**
   * Peek at the highest priority element without removing it
   * @returns the highest priority element or undefined if empty
   */
  peek(): T | undefined {
    const node = this.heap.peek();
    return node ? node.data : undefined;
  }

  /**
   * Clear all elements from the priority queue
   */
  clear(): void {
    this.heap.clear();
  }

  /**
   * Convert priority queue to array of data elements
   * @returns array of data elements
   */
  toArray(): T[] {
    return this.heap.toArray().map((node) => node.data);
  }

  /**
   * Convert priority queue to array of priority nodes
   * @returns array of priority nodes
   */
  toNodeArray(): PriorityNode<T>[] {
    return this.heap.toArray();
  }

  /**
   * Get string representation of the priority queue
   * @returns string representation
   */
  toString(): string {
    const nodes = this.heap
      .toArray()
      .map((node) => `${node.data}(${node.priority})`);
    return `PriorityQueue(${this.size()}): [${nodes.join(', ')}]`;
  }
}
