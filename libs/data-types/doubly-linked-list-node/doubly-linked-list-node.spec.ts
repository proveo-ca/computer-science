import { describe, test, expect } from 'bun:test';
import { DoublyLinkedListNode } from './doubly-linked-list-node';

describe('DoublyLinkedListNode', () => {
  test('should create a doubly linked node with data', () => {
    const startTime = performance.now();
    const node = new DoublyLinkedListNode<number>(42);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(node.getData()).toBe(42);
    expect(node.getNext()).toBe(null);
    expect(node.getPrev()).toBe(null);
    expect(node.hasNext()).toBe(false);
    expect(node.hasPrev()).toBe(false);

    console.log(`Doubly linked node creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should link nodes bidirectionally', () => {
    const startTime = performance.now();
    const node1 = new DoublyLinkedListNode<string>('first');
    const node2 = new DoublyLinkedListNode<string>('second');
    const node3 = new DoublyLinkedListNode<string>('third');

    node1.linkNext(node2);
    node2.linkNext(node3);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(node1.getNext()).toBe(node2);
    expect(node2.getPrev()).toBe(node1);
    expect(node2.getNext()).toBe(node3);
    expect(node3.getPrev()).toBe(node2);

    console.log(`Bidirectional linking: ${executionTime.toFixed(3)} ms`);
  });

  test('should unlink nodes correctly', () => {
    const node1 = new DoublyLinkedListNode<number>(1);
    const node2 = new DoublyLinkedListNode<number>(2);
    const node3 = new DoublyLinkedListNode<number>(3);

    node1.linkNext(node2);
    node2.linkNext(node3);

    const startTime = performance.now();
    node2.unlink();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(node1.getNext()).toBe(node3);
    expect(node3.getPrev()).toBe(node1);
    expect(node2.getNext()).toBe(null);
    expect(node2.getPrev()).toBe(null);

    console.log(`Node unlinking: ${executionTime.toFixed(3)} ms`);
  });

  test('should handle edge cases', () => {
    const node = new DoublyLinkedListNode<boolean>(true);

    node.linkNext(null);
    node.linkPrev(null);

    expect(node.getNext()).toBe(null);
    expect(node.getPrev()).toBe(null);
    expect(node.hasNext()).toBe(false);
    expect(node.hasPrev()).toBe(false);
  });

  test('performance with large doubly linked chain', () => {
    const chainSize = 1000;
    const startTime = performance.now();

    let head = new DoublyLinkedListNode<number>(0);
    let current = head;

    for (let i = 1; i < chainSize; i++) {
      const newNode = new DoublyLinkedListNode<number>(i);
      current.linkNext(newNode);
      current = newNode;
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(head.getData()).toBe(0);
    expect(head.hasNext()).toBe(true);
    expect(head.hasPrev()).toBe(false);

    console.log(
      `Doubly linked chain creation (${chainSize} nodes): ${executionTime.toFixed(
        3
      )} ms`
    );
  });
});
