import { PriorityQueue, PriorityNode } from '../priority-queue/priority-queue';
import { MaxHeap } from '../max-heap/max-heap';
import { Heap } from '../heap/heap';

/**
 * Max Priority Queue Implementation
 * Elements with higher priority values have higher priority
 * Time Complexity: O(log n) - enqueue, dequeue
 * Time Complexity: O(1) - peek, isEmpty
 * Space Complexity: O(n) - where n is the number of elements
 */
export class MaxPriorityQueue<T> extends PriorityQueue<T> {
  constructor(capacity: number = 100) {
    super(capacity);
  }

  /**
   * Create a max heap for the priority queue
   * @param capacity - heap capacity
   * @returns MaxHeap instance
   */
  protected createHeap(capacity: number): Heap<PriorityNode<T>> {
    return new (class extends MaxHeap<PriorityNode<T>> {
      protected compare(a: PriorityNode<T>, b: PriorityNode<T>): boolean {
        return a.priority > b.priority;
      }
    })(capacity);
  }

  /**
   * Get the maximum priority value
   * @returns the maximum priority or undefined if empty
   */
  getMaxPriority(): number | undefined {
    const node = this.heap.peek();
    return node ? node.priority : undefined;
  }

  /**
   * Create a max priority queue from an array of items with priorities
   * @param items - array of [data, priority] tuples
   * @param capacity - optional capacity
   * @returns new MaxPriorityQueue instance
   */
  static fromArray<T>(
    items: [T, number][],
    capacity?: number
  ): MaxPriorityQueue<T> {
    const pq = new MaxPriorityQueue<T>(capacity || items.length * 2);
    for (const [data, priority] of items) {
      pq.enqueue(data, priority);
    }
    return pq;
  }

  /**
   * Get string representation of the max priority queue
   * @returns string representation
   */
  toString(): string {
    const nodes = this.heap
      .toArray()
      .map((node) => `${node.data}(${node.priority})`);
    return `MaxPriorityQueue(${this.size()}): [${nodes.join(', ')}]`;
  }
}
