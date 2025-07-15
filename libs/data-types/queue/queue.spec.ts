import { describe, test, expect } from 'bun:test';
import { Queue } from './queue';

describe('Queue', () => {
  test('should create an empty queue', () => {
    const startTime = performance.now();
    const queue = new Queue<number>();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeUndefined();
    expect(queue.front()).toBeUndefined();

    console.log(`Queue creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should enqueue and dequeue correctly', () => {
    const queue = new Queue<string>();

    const startTime = performance.now();
    queue.enqueue('first');
    queue.enqueue('second');
    queue.enqueue('third');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(queue.size()).toBe(3);
    expect(queue.peek()).toBe('first');
    expect(queue.front()).toBe('first');

    expect(queue.dequeue()).toBe('first');
    expect(queue.dequeue()).toBe('second');
    expect(queue.size()).toBe(1);
    expect(queue.peek()).toBe('third');

    console.log(`Enqueue/Dequeue operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should throw error when dequeuing from empty queue', () => {
    const queue = new Queue<number>();

    expect(() => queue.dequeue()).toThrow('Queue is empty - cannot dequeue');
  });

  test('should clear queue correctly', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    queue.clear();

    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  test('should convert to array correctly', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const array = queue.toArray();

    expect(array).toEqual([1, 2, 3]); // Front to rear
  });

  test('should create queue from array', () => {
    const items = [1, 2, 3, 4, 5];

    const startTime = performance.now();
    const queue = Queue.fromArray(items);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(queue.size()).toBe(5);
    expect(queue.peek()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);

    console.log(`Queue from array creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should iterate correctly', () => {
    const queue = new Queue<string>();
    queue.enqueue('a');
    queue.enqueue('b');
    queue.enqueue('c');

    const items: string[] = [];
    for (const item of queue) {
      items.push(item);
    }

    expect(items).toEqual(['a', 'b', 'c']);
  });

  test('should maintain FIFO order', () => {
    const queue = new Queue<number>();
    const items = [10, 20, 30, 40, 50];

    // Enqueue all items
    for (const item of items) {
      queue.enqueue(item);
    }

    // Dequeue all items and verify order
    const dequeuedItems: number[] = [];
    while (!queue.isEmpty()) {
      dequeuedItems.push(queue.dequeue());
    }

    expect(dequeuedItems).toEqual(items);
  });

  test('should handle mixed operations', () => {
    const queue = new Queue<string>();

    queue.enqueue('first');
    queue.enqueue('second');
    expect(queue.dequeue()).toBe('first');

    queue.enqueue('third');
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe('second');

    expect(queue.dequeue()).toBe('second');
    expect(queue.dequeue()).toBe('third');
    expect(queue.isEmpty()).toBe(true);
  });

  test('performance with large dataset', () => {
    const queue = new Queue<number>();
    const dataSize = 10000;

    const startTime = performance.now();
    for (let i = 0; i < dataSize; i++) {
      queue.enqueue(i);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(queue.size()).toBe(dataSize);
    expect(queue.peek()).toBe(0);

    console.log(
      `Large dataset enqueue (${dataSize} items): ${executionTime.toFixed(
        3
      )} ms`
    );

    const dequeueStartTime = performance.now();
    for (let i = 0; i < dataSize; i++) {
      const dequeued = queue.dequeue();
      expect(dequeued).toBe(i);
    }
    const dequeueEndTime = performance.now();
    const dequeueExecutionTime = dequeueEndTime - dequeueStartTime;

    expect(queue.isEmpty()).toBe(true);

    console.log(
      `Large dataset dequeue (${dataSize} items): ${dequeueExecutionTime.toFixed(
        3
      )} ms`
    );
  });
});
