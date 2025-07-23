import { describe, test, expect } from 'bun:test';
import { MinPriorityQueue } from '../min-priority-queue/min-priority-queue';
import { MaxPriorityQueue } from '../max-priority-queue/max-priority-queue';

describe('PriorityQueue', () => {
  describe('MinPriorityQueue', () => {
    test('should create an empty min priority queue', () => {
      const startTime = performance.now();
      const pq = new MinPriorityQueue<string>();
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(pq.isEmpty()).toBe(true);
      expect(pq.size()).toBe(0);
      expect(pq.peek()).toBeUndefined();

      console.log(`MinPriorityQueue creation: ${executionTime.toFixed(3)} ms`);
    });

    test('should enqueue and dequeue by priority correctly', () => {
      const pq = new MinPriorityQueue<string>();

      const startTime = performance.now();
      pq.enqueue('low', 3);
      pq.enqueue('high', 1);
      pq.enqueue('medium', 2);
      pq.enqueue('urgent', 0);
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(pq.size()).toBe(4);
      expect(pq.peek()).toBe('urgent');
      expect(pq.getMinPriority()).toBe(0);

      expect(pq.dequeue()).toBe('urgent');
      expect(pq.dequeue()).toBe('high');
      expect(pq.dequeue()).toBe('medium');
      expect(pq.dequeue()).toBe('low');

      console.log(
        `MinPriorityQueue enqueue/dequeue operations: ${executionTime.toFixed(
          3
        )} ms`
      );
    });

    test('should create from array correctly', () => {
      const items: [string, number][] = [
        ['task1', 3],
        ['task2', 1],
        ['task3', 2],
        ['task4', 0],
      ];

      const startTime = performance.now();
      const pq = MinPriorityQueue.fromArray(items);
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(pq.size()).toBe(4);
      expect(pq.peek()).toBe('task4');

      console.log(
        `MinPriorityQueue from array creation: ${executionTime.toFixed(3)} ms`
      );
    });
  });

  describe('MaxPriorityQueue', () => {
    test('should create an empty max priority queue', () => {
      const pq = new MaxPriorityQueue<string>();

      expect(pq.isEmpty()).toBe(true);
      expect(pq.size()).toBe(0);
      expect(pq.peek()).toBeUndefined();
    });

    test('should enqueue and dequeue by priority correctly', () => {
      const pq = new MaxPriorityQueue<string>();

      pq.enqueue('low', 1);
      pq.enqueue('high', 5);
      pq.enqueue('medium', 3);
      pq.enqueue('urgent', 10);

      expect(pq.size()).toBe(4);
      expect(pq.peek()).toBe('urgent');
      expect(pq.getMaxPriority()).toBe(10);

      expect(pq.dequeue()).toBe('urgent');
      expect(pq.dequeue()).toBe('high');
      expect(pq.dequeue()).toBe('medium');
      expect(pq.dequeue()).toBe('low');
    });
  });

  test('should throw error when dequeuing from empty queue', () => {
    const pq = new MinPriorityQueue<string>();

    expect(() => pq.dequeue()).toThrow(
      'Priority queue is empty - cannot dequeue'
    );
  });

  test('should handle same priorities correctly', () => {
    const pq = new MinPriorityQueue<string>();

    pq.enqueue('first', 1);
    pq.enqueue('second', 1);
    pq.enqueue('third', 1);

    expect(pq.size()).toBe(3);

    // All have same priority, so any order is valid
    const results = [pq.dequeue(), pq.dequeue(), pq.dequeue()];
    expect(results.sort()).toEqual(['first', 'second', 'third']);
  });

  test('performance with large dataset', () => {
    const pq = new MinPriorityQueue<number>(10000);
    const dataSize = 5000;

    const startTime = performance.now();
    for (let i = dataSize; i > 0; i--) {
      pq.enqueue(i, i);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(pq.size()).toBe(dataSize);
    expect(pq.peek()).toBe(1);

    console.log(
      `Large dataset enqueue (${dataSize} items): ${executionTime.toFixed(
        3
      )} ms`
    );

    const dequeueStartTime = performance.now();
    const results: number[] = [];
    for (let i = 0; i < 100; i++) {
      results.push(pq.dequeue());
    }
    const dequeueEndTime = performance.now();
    const dequeueExecutionTime = dequeueEndTime - dequeueStartTime;

    expect(results).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));

    console.log(
      `Large dataset dequeue (100 items): ${dequeueExecutionTime.toFixed(3)} ms`
    );
  });
});
