import { describe, test, expect } from 'bun:test';
import { Deque } from './deque';

describe('Deque', () => {
  test('should create an empty deque', () => {
    const startTime = performance.now();
    const deque = new Deque<number>();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(deque.isEmpty()).toBe(true);
    expect(deque.size()).toBe(0);
    expect(deque.peekAtHead()).toBeUndefined();
    expect(deque.peekAtTail()).toBeUndefined();

    console.log(`Deque creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should insert and extract from head', () => {
    const deque = new Deque<string>();

    const startTime = performance.now();
    deque.insertAtHead('first');
    deque.insertAtHead('second');
    deque.insertAtHead('third');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(deque.size()).toBe(3);
    expect(deque.peekAtHead()).toBe('third');
    expect(deque.peekAtTail()).toBe('first');

    expect(deque.extractHead()).toBe('third');
    expect(deque.extractHead()).toBe('second');
    expect(deque.size()).toBe(1);
    expect(deque.peekAtHead()).toBe('first');

    console.log(
      `Head insert/extract operations: ${executionTime.toFixed(3)} ms`
    );
  });

  test('should insert and extract from tail', () => {
    const deque = new Deque<number>();

    const startTime = performance.now();
    deque.insertAtTail(1);
    deque.insertAtTail(2);
    deque.insertAtTail(3);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(deque.size()).toBe(3);
    expect(deque.peekAtHead()).toBe(1);
    expect(deque.peekAtTail()).toBe(3);

    expect(deque.extractTail()).toBe(3);
    expect(deque.extractTail()).toBe(2);
    expect(deque.size()).toBe(1);
    expect(deque.peekAtTail()).toBe(1);

    console.log(
      `Tail insert/extract operations: ${executionTime.toFixed(3)} ms`
    );
  });

  test('should handle mixed operations', () => {
    const deque = new Deque<string>();

    deque.insertAtHead('middle');
    deque.insertAtHead('left');
    deque.insertAtTail('right');

    expect(deque.toArray()).toEqual(['left', 'middle', 'right']);

    expect(deque.extractHead()).toBe('left');
    expect(deque.extractTail()).toBe('right');
    expect(deque.peekAtHead()).toBe('middle');
    expect(deque.peekAtTail()).toBe('middle');
  });

  test('should throw error when extracting from empty deque', () => {
    const deque = new Deque<number>();

    expect(() => deque.extractHead()).toThrow(
      'Deque is empty - cannot extract from head'
    );
    expect(() => deque.extractTail()).toThrow(
      'Deque is empty - cannot extract from tail'
    );
  });

  test('should clear deque correctly', () => {
    const deque = new Deque<number>();
    deque.insertAtHead(1);
    deque.insertAtTail(2);
    deque.insertAtHead(3);

    deque.clear();

    expect(deque.isEmpty()).toBe(true);
    expect(deque.size()).toBe(0);
    expect(deque.peekAtHead()).toBeUndefined();
    expect(deque.peekAtTail()).toBeUndefined();
  });

  test('should create deque from array', () => {
    const items = [1, 2, 3, 4, 5];

    const startTime = performance.now();
    const deque = Deque.fromArray(items);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(deque.size()).toBe(5);
    expect(deque.peekAtHead()).toBe(1);
    expect(deque.peekAtTail()).toBe(5);
    expect(deque.toArray()).toEqual(items);

    console.log(`Deque from array creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should iterate correctly', () => {
    const deque = new Deque<number>();
    deque.insertAtTail(1);
    deque.insertAtTail(2);
    deque.insertAtTail(3);

    const forwardItems: number[] = [];
    for (const item of deque) {
      forwardItems.push(item);
    }

    const reverseItems: number[] = [];
    for (const item of deque.reverseIterator()) {
      reverseItems.push(item);
    }

    expect(forwardItems).toEqual([1, 2, 3]);
    expect(reverseItems).toEqual([3, 2, 1]);
  });

  test('performance with large dataset', () => {
    const deque = new Deque<number>();
    const dataSize = 10000;

    const startTime = performance.now();
    for (let i = 0; i < dataSize / 2; i++) {
      deque.insertAtHead(i);
      deque.insertAtTail(i + dataSize / 2);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(deque.size()).toBe(dataSize);

    console.log(
      `Large dataset insertion (${dataSize} items): ${executionTime.toFixed(
        3
      )} ms`
    );

    const extractStartTime = performance.now();
    for (let i = 0; i < dataSize / 2; i++) {
      deque.extractHead();
      deque.extractTail();
    }
    const extractEndTime = performance.now();
    const extractExecutionTime = extractEndTime - extractStartTime;

    expect(deque.isEmpty()).toBe(true);

    console.log(
      `Large dataset extraction (${dataSize} items): ${extractExecutionTime.toFixed(
        3
      )} ms`
    );
  });
});
