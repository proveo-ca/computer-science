import { describe, test, expect } from 'bun:test';
import { BinaryTreeNode } from './binary-tree-node';

describe('BinaryTreeNode', () => {
  test('should create a binary tree node with data', () => {
    const startTime = performance.now();
    const node = new BinaryTreeNode<number>(42);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(node.data).toBe(42);
    expect(node.left).toBe(null);
    expect(node.right).toBe(null);
    expect(node.parent).toBe(null);
    expect(node.count).toBe(1);
    expect(node.isLeaf()).toBe(true);

    console.log(`Binary tree node creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should set children and update parent references', () => {
    const root = new BinaryTreeNode<string>('root');
    const leftChild = new BinaryTreeNode<string>('left');
    const rightChild = new BinaryTreeNode<string>('right');

    const startTime = performance.now();
    root.setLeft(leftChild);
    root.setRight(rightChild);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(root.left).toBe(leftChild);
    expect(root.right).toBe(rightChild);
    expect(leftChild.parent).toBe(root);
    expect(rightChild.parent).toBe(root);
    expect(root.hasLeft()).toBe(true);
    expect(root.hasRight()).toBe(true);
    expect(root.hasBothChildren()).toBe(true);
    expect(root.isLeaf()).toBe(false);

    console.log(
      `Child setting and parent linking: ${executionTime.toFixed(3)} ms`
    );
  });

  test('should calculate height correctly', () => {
    const root = new BinaryTreeNode<number>(1);
    const left = new BinaryTreeNode<number>(2);
    const right = new BinaryTreeNode<number>(3);
    const leftLeft = new BinaryTreeNode<number>(4);

    root.setLeft(left);
    root.setRight(right);
    left.setLeft(leftLeft);

    const startTime = performance.now();
    const height = root.getHeight();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(height).toBe(2);
    expect(left.getHeight()).toBe(1);
    expect(leftLeft.getHeight()).toBe(0);

    console.log(`Height calculation: ${executionTime.toFixed(3)} ms`);
  });

  test('should calculate size correctly', () => {
    const root = new BinaryTreeNode<number>(1);
    const left = new BinaryTreeNode<number>(2);
    const right = new BinaryTreeNode<number>(3);

    root.setLeft(left);
    root.setRight(right);

    const startTime = performance.now();
    const size = root.getSize();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(size).toBe(3);

    console.log(`Size calculation: ${executionTime.toFixed(3)} ms`);
  });

  test('should find min and max correctly', () => {
    const root = new BinaryTreeNode<number>(5);
    const left = new BinaryTreeNode<number>(3);
    const right = new BinaryTreeNode<number>(7);
    const leftLeft = new BinaryTreeNode<number>(1);
    const rightRight = new BinaryTreeNode<number>(9);

    root.setLeft(left);
    root.setRight(right);
    left.setLeft(leftLeft);
    right.setRight(rightRight);

    const startTime = performance.now();
    const min = root.findMin();
    const max = root.findMax();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(min.data).toBe(1);
    expect(max.data).toBe(9);

    console.log(`Min/Max finding: ${executionTime.toFixed(3)} ms`);
  });

  test('should handle count operations', () => {
    const node = new BinaryTreeNode<string>('duplicate');

    expect(node.count).toBe(1);

    node.incrementCount();
    expect(node.count).toBe(2);

    node.incrementCount();
    expect(node.count).toBe(3);

    node.decrementCount();
    expect(node.count).toBe(2);

    node.decrementCount();
    node.decrementCount();
    expect(node.count).toBe(0);

    // Should not go below 0
    node.decrementCount();
    expect(node.count).toBe(0);
  });

  test('should find successor and predecessor', () => {
    // Create a BST: 5 -> 3,7 -> 1,4,6,9
    const root = new BinaryTreeNode<number>(5);
    const n3 = new BinaryTreeNode<number>(3);
    const n7 = new BinaryTreeNode<number>(7);
    const n1 = new BinaryTreeNode<number>(1);
    const n4 = new BinaryTreeNode<number>(4);
    const n6 = new BinaryTreeNode<number>(6);
    const n9 = new BinaryTreeNode<number>(9);

    root.setLeft(n3);
    root.setRight(n7);
    n3.setLeft(n1);
    n3.setRight(n4);
    n7.setLeft(n6);
    n7.setRight(n9);

    const startTime = performance.now();
    const successor = n3.findSuccessor();
    const predecessor = n7.findPredecessor();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(successor?.data).toBe(4);
    expect(predecessor?.data).toBe(6);

    console.log(
      `Successor/Predecessor finding: ${executionTime.toFixed(3)} ms`
    );
  });

  test('performance with large tree creation', () => {
    const nodeCount = 1000;
    const startTime = performance.now();

    const root = new BinaryTreeNode<number>(500);
    let current = root;

    // Create a simple chain to the right
    for (let i = 501; i < 500 + nodeCount; i++) {
      const newNode = new BinaryTreeNode<number>(i);
      current.setRight(newNode);
      current = newNode;
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(root.data).toBe(500);
    expect(root.hasRight()).toBe(true);

    console.log(
      `Large tree creation (${nodeCount} nodes): ${executionTime.toFixed(3)} ms`
    );
  });
});
