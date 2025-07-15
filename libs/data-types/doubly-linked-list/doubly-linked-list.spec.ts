import { describe, test, expect } from 'bun:test';
import { DoublyLinkedList } from './doubly-linked-list';

describe('DoublyLinkedList', () => {
  test('should create an empty doubly linked list', () => {
    const startTime = performance.now();
    const list = new DoublyLinkedList<number>();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();

    console.log(`DoublyLinkedList creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should insert at head correctly', () => {
    const list = new DoublyLinkedList<string>();

    const startTime = performance.now();
    list.insertAtHead('first');
    list.insertAtHead('second');
    list.insertAtHead('third');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.size()).toBe(3);
    expect(list.getHead()).toBe('third');
    expect(list.getTail()).toBe('first');
    expect(list.toArray()).toEqual(['third', 'second', 'first']);

    console.log(`Head insertion operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should insert at tail correctly', () => {
    const list = new DoublyLinkedList<number>();

    const startTime = performance.now();
    list.insertAtTail(1);
    list.insertAtTail(2);
    list.insertAtTail(3);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.size()).toBe(3);
    expect(list.getHead()).toBe(1);
    expect(list.getTail()).toBe(3);
    expect(list.toArray()).toEqual([1, 2, 3]);

    console.log(`Tail insertion operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should remove from head and tail correctly', () => {
    const list = new DoublyLinkedList<string>();
    list.insertAtTail('first');
    list.insertAtTail('second');
    list.insertAtTail('third');
    list.insertAtTail('fourth');

    const startTime = performance.now();
    const removedHead = list.removeHead();
    const removedTail = list.removeTail();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(removedHead).toBe('first');
    expect(removedTail).toBe('fourth');
    expect(list.size()).toBe(2);
    expect(list.toArray()).toEqual(['second', 'third']);

    console.log(`Head/Tail removal operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should search for elements correctly', () => {
    const list = new DoublyLinkedList<number>();
    list.insertAtTail(10);
    list.insertAtTail(20);
    list.insertAtTail(30);

    const startTime = performance.now();
    const found = list.search(20);
    const notFound = list.search(40);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(found?.data).toBe(20);
    expect(notFound).toBeNull();

    console.log(`Search operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should remove by value correctly', () => {
    const list = new DoublyLinkedList<string>();
    list.insertAtTail('apple');
    list.insertAtTail('banana');
    list.insertAtTail('cherry');
    list.insertAtTail('date');

    // Remove middle element
    const removed1 = list.removeByValue('banana');
    expect(removed1).toBe(true);
    expect(list.toArray()).toEqual(['apple', 'cherry', 'date']);

    // Remove head
    const removed2 = list.removeByValue('apple');
    expect(removed2).toBe(true);
    expect(list.toArray()).toEqual(['cherry', 'date']);

    // Remove tail
    const removed3 = list.removeByValue('date');
    expect(removed3).toBe(true);
    expect(list.toArray()).toEqual(['cherry']);

    // Try to remove non-existent
    const notRemoved = list.removeByValue('grape');
    expect(notRemoved).toBe(false);
  });

  test('should iterate forward and backward correctly', () => {
    const list = new DoublyLinkedList<number>();
    list.insertAtTail(1);
    list.insertAtTail(2);
    list.insertAtTail(3);

    const forwardItems: number[] = [];
    for (const item of list) {
      forwardItems.push(item);
    }

    const backwardItems: number[] = [];
    for (const item of list.reverseIterator()) {
      backwardItems.push(item);
    }

    expect(forwardItems).toEqual([1, 2, 3]);
    expect(backwardItems).toEqual([3, 2, 1]);
  });

  test('should create from array correctly', () => {
    const items = [1, 2, 3, 4, 5];

    const startTime = performance.now();
    const list = DoublyLinkedList.fromArray(items);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.size()).toBe(5);
    expect(list.toArray()).toEqual(items);
    expect(list.getHead()).toBe(1);
    expect(list.getTail()).toBe(5);

    console.log(
      `DoublyLinkedList from array creation: ${executionTime.toFixed(3)} ms`
    );
  });

  test('should handle single element operations', () => {
    const list = new DoublyLinkedList<string>();

    list.insertAtHead('only');
    expect(list.head).toBe(list.tail);
    expect(list.getHead()).toBe('only');
    expect(list.getTail()).toBe('only');

    const removed = list.removeHead();
    expect(removed).toBe('only');
    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  test('should handle edge cases', () => {
    const list = new DoublyLinkedList<number>();

    expect(list.removeHead()).toBeNull();
    expect(list.removeTail()).toBeNull();
    expect(list.removeByValue(1)).toBe(false);
    expect(list.search(1)).toBeNull();
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
  });

  test('performance with large dataset', () => {
    const list = new DoublyLinkedList<number>();
    const dataSize = 10000;

    const startTime = performance.now();
    for (let i = 0; i < dataSize / 2; i++) {
      list.insertAtHead(i);
      list.insertAtTail(i + dataSize / 2);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(list.size()).toBe(dataSize);

    console.log(
      `Large dataset insertion (${dataSize} items): ${executionTime.toFixed(
        3
      )} ms`
    );

    const removalStartTime = performance.now();
    for (let i = 0; i < dataSize / 4; i++) {
      list.removeHead();
      list.removeTail();
    }
    const removalEndTime = performance.now();
    const removalExecutionTime = removalEndTime - removalStartTime;

    expect(list.size()).toBe(dataSize / 2);

    console.log(
      `Large dataset removal (${
        dataSize / 2
      } items): ${removalExecutionTime.toFixed(3)} ms`
    );
  });
});
