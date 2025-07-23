import { PriorityQueue, PriorityNode } from '../priority-queue/priority-queue.js';
import { MinHeap } from '../min-heap/min-heap.js';
import { Heap } from '../heap/heap.js';

/**
 * Min Priority Queue Implementation
 * Elements with lower priority values have higher priority
 * Time Complexity: O(log n) - enqueue, dequeue
 * Time Complexity: O(1) - peek, isEmpty
 * Space Complexity: O(n) - where n is the number of elements
 */
export class MinPriorityQueue<T> extends PriorityQueue<T> {
  constructor(capacity: number = 100) {
    super(capacity);
  }

  /**
   * Create a min heap for the priority queue
   * @param capacity - heap capacity
   * @returns MinHeap instance
   */
  protected createHeap(capacity: number): Heap<PriorityNode<T>> {
    return new (class extends MinHeap<PriorityNode<T>> {
      protected override compare(
        a: PriorityNode<T>,
        b: PriorityNode<T>
      ): boolean {
        return a.priority < b.priority;
      }
    })(capacity);
  }

  /**
   * Get the minimum priority value
   * @returns the minimum priority or undefined if empty
   */
  getMinPriority(): number | undefined {
    const node = this.heap.peek();
    return node ? node.priority : undefined;
  }

  /**
   * Create a min priority queue from an array of items with priorities
   * @param items - array of [data, priority] tuples
   * @param capacity - optional capacity
   * @returns new MinPriorityQueue instance
   */
  static fromArray<T>(
    items: [T, number][],
    capacity?: number
  ): MinPriorityQueue<T> {
    const pq = new MinPriorityQueue<T>(capacity || items.length * 2);
    for (const [data, priority] of items) {
      pq.enqueue(data, priority);
    }
    return pq;
  }

  /**
   * Get string representation of the min priority queue
   * @returns string representation
   */
  override toString(): string {
    const nodes = this.heap
      .toArray()
      .map((node) => `${node.data}(${node.priority})`);
    return `MinPriorityQueue(${this.size()}): [${nodes.join(', ')}]`;
  }
}
