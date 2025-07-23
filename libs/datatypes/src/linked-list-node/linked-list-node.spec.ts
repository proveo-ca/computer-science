import { describe, test, expect } from 'bun:test';
import { LinkedListNode } from './linked-list-node';

describe('LinkedListNode', () => {
  test('should create a node with data', () => {
    const startTime = performance.now();
    const node = new LinkedListNode<number>(42);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(node.getData()).toBe(42);
    expect(node.getNext()).toBe(null);
    expect(node.hasNext()).toBe(false);

    console.log(`Node creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should link nodes together', () => {
    const startTime = performance.now();
    const node1 = new LinkedListNode<string>('first');
    const node2 = new LinkedListNode<string>('second');

    node1.setNext(node2);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(node1.hasNext()).toBe(true);
    expect(node1.getNext()).toBe(node2);
    expect(node2.hasNext()).toBe(false);

    console.log(`Node linking: ${executionTime.toFixed(3)} ms`);
  });

  test('should update data correctly', () => {
    const node = new LinkedListNode<number>(10);

    node.setData(20);

    expect(node.getData()).toBe(20);
  });

  test('should handle null next node', () => {
    const node = new LinkedListNode<boolean>(true);

    node.setNext(null);

    expect(node.getNext()).toBe(null);
    expect(node.hasNext()).toBe(false);
  });

  test('performance with large chain creation', () => {
    const chainSize = 1000;
    const startTime = performance.now();

    let head = new LinkedListNode<number>(0);
    let current = head;

    for (let i = 1; i < chainSize; i++) {
      const newNode = new LinkedListNode<number>(i);
      current.setNext(newNode);
      current = newNode;
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(head.getData()).toBe(0);
    expect(head.hasNext()).toBe(true);

    console.log(
      `Chain creation (${chainSize} nodes): ${executionTime.toFixed(3)} ms`
    );
  });
});
