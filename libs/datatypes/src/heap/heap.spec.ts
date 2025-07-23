import { describe, test, expect } from 'bun:test';
import { MinHeap } from '../min-heap/min-heap';

describe('Heap', () => {
  // describe('MinHeap', () => {
  //   test('should create an empty min heap', () => {
  //     const startTime = performance.now();
  //     const heap = new MinHeap<number>();
  //     const endTime = performance.now();
  //     const executionTime = endTime - startTime;
  //
  //     expect(heap.isEmpty()).toBe(true);
  //     expect(heap.size()).toBe(0);
  //     expect(heap.peekMin()).toBeUndefined();
  //
  //     console.log(`MinHeap creation: ${executionTime.toFixed(3)} ms`);
  //   });
  //
  //   test('should insert and maintain min heap property', () => {
  //     const heap = new MinHeap<number>();
  //
  //     const startTime = performance.now();
  //     heap.insert(10);
  //     heap.insert(5);
  //     heap.insert(15);
  //     heap.insert(3);
  //     heap.insert(8);
  //     const endTime = performance.now();
  //     const executionTime = endTime - startTime;
  //
  //     expect(heap.size()).toBe(5);
  //     expect(heap.peekMin()).toBe(3);
  //
  //     console.log(
  //       `MinHeap insertion operations: ${executionTime.toFixed(3)} ms`
  //     );
  //   });
  //
  //   test('should extract minimum elements correctly', () => {
  //     const heap = new MinHeap<number>();
  //     const items = [10, 5, 15, 3, 8, 12, 1];
  //
  //     for (const item of items) {
  //       heap.insert(item);
  //     }
  //
  //     const startTime = performance.now();
  //     const extracted: number[] = [];
  //     while (!heap.isEmpty()) {
  //       extracted.push(heap.extractMin());
  //     }
  //     const endTime = performance.now();
  //     const executionTime = endTime - startTime;
  //
  //     expect(extracted).toEqual([1, 3, 5, 8, 10, 12, 15]);
  //
  //     console.log(
  //       `MinHeap extraction operations: ${executionTime.toFixed(3)} ms`
  //     );
  //   });
  //
  //   test('should build heap from array efficiently', () => {
  //     const items = [10, 5, 15, 3, 8, 12, 1];
  //
  //     const startTime = performance.now();
  //     const heap = MinHeap.buildHeap(items);
  //     const endTime = performance.now();
  //     const executionTime = endTime - startTime;
  //
  //     expect(heap.size()).toBe(7);
  //     expect(heap.peekMin()).toBe(1);
  //
  //     console.log(
  //       `MinHeap buildHeap operation: ${executionTime.toFixed(3)} ms`
  //     );
  //   });
  // });
  //
  // describe('MaxHeap', () => {
  //   test('should create an empty max heap', () => {
  //     const heap = new MaxHeap<number>();
  //
  //     expect(heap.isEmpty()).toBe(true);
  //     expect(heap.size()).toBe(0);
  //     expect(heap.peekMax()).toBeUndefined();
  //   });
  //
  //   test('should insert and maintain max heap property', () => {
  //     const heap = new MaxHeap<number>();
  //
  //     heap.insert(10);
  //     heap.insert(5);
  //     heap.insert(15);
  //     heap.insert(3);
  //     heap.insert(8);
  //
  //     expect(heap.size()).toBe(5);
  //     expect(heap.peekMax()).toBe(15);
  //   });
  //
  //   test('should extract maximum elements correctly', () => {
  //     const heap = new MaxHeap<number>();
  //     const items = [10, 5, 15, 3, 8, 12, 1];
  //
  //     for (const item of items) {
  //       heap.insert(item);
  //     }
  //
  //     const extracted: number[] = [];
  //     while (!heap.isEmpty()) {
  //       extracted.push(heap.extractMax());
  //     }
  //
  //     expect(extracted).toEqual([15, 12, 10, 8, 5, 3, 1]);
  //   });
  // });

  test('should handle capacity limits', () => {
    const heap = new MinHeap<number>(3);

    heap.insert(1);
    heap.insert(2);
    heap.insert(3);

    expect(() => heap.insert(4)).toThrow('Heap is full - cannot insert');
  });

  test('should throw error when extracting from empty heap', () => {
    const heap = new MinHeap<number>();

    expect(() => heap.extractMin()).toThrow('Heap is empty - cannot extract');
  });

  test('performance with large dataset', () => {
    const heap = new MinHeap<number>(10000);
    const dataSize = 5000;

    const startTime = performance.now();
    for (let i = dataSize; i > 0; i--) {
      heap.insert(i);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(heap.size()).toBe(dataSize);
    expect(heap.peekMin()).toBe(1);

    console.log(
      `Large dataset insertion (${dataSize} items): ${executionTime.toFixed(
        3
      )} ms`
    );

    const extractStartTime = performance.now();
    const extracted: number[] = [];
    for (let i = 0; i < 100; i++) {
      extracted.push(heap.extractMin());
    }
    const extractEndTime = performance.now();
    const extractExecutionTime = extractEndTime - extractStartTime;

    expect(extracted).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));

    console.log(
      `Large dataset extraction (100 items): ${extractExecutionTime.toFixed(
        3
      )} ms`
    );
  });
});
