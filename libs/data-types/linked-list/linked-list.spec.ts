import { describe, test, expect } from 'bun:test';
import { LinkedList } from './linked-list';

describe('LinkedList', () => {
  test('should create an empty linked list', () => {
    const startTime = performance.now();
    const list = new LinkedList<number>();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
    expect(list.head).toBeNull();

    console.log(`LinkedList creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should insert at head correctly', () => {
    const list = new LinkedList<string>();

    const startTime = performance.now();
    list.insertAtHead('first');
    list.insertAtHead('second');
    list.insertAtHead('third');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.size()).toBe(3);
    expect(list.head?.getData()).toBe('third');
    expect(list.toArray()).toEqual(['third', 'second', 'first']);

    console.log(`Head insertion operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should remove head correctly', () => {
    const list = new LinkedList<string>();
    list.insertAtHead('first');
    list.insertAtHead('second');
    list.insertAtHead('third');

    const startTime = performance.now();
    const removed = list.removeHead();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(removed).toBe('third');
    expect(list.size()).toBe(2);
    expect(list.toArray()).toEqual(['second', 'first']);

    console.log(`Head removal operation: ${executionTime.toFixed(3)} ms`);
  });

  test('should search for elements correctly', () => {
    const list = new LinkedList<number>();
    list.insertAtHead(10);
    list.insertAtHead(20);
    list.insertAtHead(30);

    const startTime = performance.now();
    const found = list.search(20);
    const notFound = list.search(40);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(found?.getData()).toBe(20);
    expect(notFound).toBeNull();

    console.log(`Search operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should remove by value correctly', () => {
    const list = new LinkedList<string>();
    list.insertAtHead('apple');
    list.insertAtHead('banana');
    list.insertAtHead('cherry');

    const removed = list.removeByValue('banana');
    const notRemoved = list.removeByValue('grape');

    expect(removed).toBe(true);
    expect(notRemoved).toBe(false);
    expect(list.size()).toBe(2);
    expect(list.toArray()).toEqual(['cherry', 'apple']);
  });

  test.only('should create from array correctly', () => {
    const items = [1, 2, 3, 4, 5];

    const startTime = performance.now();
    const list = LinkedList.fromArray(items);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.size()).toBe(5);
    expect(list.toArray()).toEqual(items);

    console.log(
      `LinkedList from array creation: ${executionTime.toFixed(3)} ms`
    );
  });

  test('should reverse correctly', () => {
    const list = new LinkedList<number>();
    list.insertAtHead(4);
    list.insertAtHead(3);
    list.insertAtHead(2);
    list.insertAtHead(1);

    const startTime = performance.now();
    list.reverse();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.toArray()).toEqual([4, 3, 2, 1]);

    console.log(`List reversal: ${executionTime.toFixed(3)} ms`);
  });

  test('should iterate correctly', () => {
    const list = new LinkedList<string>();
    list.insertAtHead('a');
    list.insertAtHead('b');
    list.insertAtHead('c');

    const items: string[] = [];
    for (const item of list) {
      items.push(item);
    }

    expect(items).toEqual(['c', 'b', 'a']);
  });

  test('should handle edge cases', () => {
    const list = new LinkedList<number>();

    expect(list.removeHead()).toBeNull();
    expect(list.removeByValue(1)).toBe(false);
    expect(list.search(1)).toBeNull();

    list.insertAtHead(42);
    expect(list.removeByValue(42)).toBe(true);
    expect(list.isEmpty()).toBe(true);
  });

  test('performance with large dataset', () => {
    const list = new LinkedList<number>();
    const dataSize = 10000;

    const startTime = performance.now();
    for (let i = 0; i < dataSize; i++) {
      list.insertAtHead(i);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.size()).toBe(dataSize);

    console.log(
      `Large dataset insertion (${dataSize} items): ${executionTime.toFixed(
        3
      )} ms`
    );

    const searchStartTime = performance.now();
    const found = list.search(dataSize / 2);
    const searchEndTime = performance.now();
    const searchExecutionTime = searchEndTime - searchStartTime;

    expect(found?.getData()).toBe(dataSize / 2);

    console.log(`Large dataset search: ${searchExecutionTime.toFixed(3)} ms`);
  });
});
