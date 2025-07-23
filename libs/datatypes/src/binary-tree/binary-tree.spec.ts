import { describe, test, expect } from 'bun:test';
import { BinaryTree } from './binary-tree';

describe('BinaryTree', () => {
  test('should create an empty binary tree', () => {
    const startTime = performance.now();
    const tree = new BinaryTree<number>();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(tree.isEmpty()).toBe(true);
    expect(tree.getSize()).toBe(0);
    expect(tree.getHeight()).toBe(-1);
    expect(tree.root).toBeNull();

    console.log(`BinaryTree creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should create tree from single element', () => {
    const tree = new BinaryTree<string>(['root']);

    expect(tree.isEmpty()).toBe(false);
    expect(tree.getSize()).toBe(1);
    expect(tree.getHeight()).toBe(0);
    expect(tree.root?.data).toBe('root');
  });

  test('should build tree from array', () => {
    const items = [1, 2, 3, 4, 5, 6, 7];

    const startTime = performance.now();
    const tree = new BinaryTree<number>(items);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(tree.getSize()).toBe(7);
    expect(tree.root?.data).toBe(1);
    expect(tree.root?.left?.data).toBe(2);
    expect(tree.root?.right?.data).toBe(3);

    console.log(`Tree from array creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should insert using BST rules', () => {
    const tree = new BinaryTree<number>();

    const startTime = performance.now();
    tree.insert(5);
    tree.insert(3);
    tree.insert(7);
    tree.insert(1);
    tree.insert(9);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(tree.getSize()).toBe(5);
    expect(tree.root?.data).toBe(5);
    expect(tree.root?.left?.data).toBe(3);
    expect(tree.root?.right?.data).toBe(7);
    expect(tree.root?.left?.left?.data).toBe(1);
    expect(tree.root?.right?.right?.data).toBe(9);

    console.log(`BST insertion operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should insert using level-order (complete tree)', () => {
    const tree = new BinaryTree<string>();

    tree.insertBT('A');
    tree.insertBT('B');
    tree.insertBT('C');
    tree.insertBT('D');
    tree.insertBT('E');

    expect(tree.getSize()).toBe(5);
    expect(tree.root?.data).toBe('A');
    expect(tree.root?.left?.data).toBe('B');
    expect(tree.root?.right?.data).toBe('C');
    expect(tree.root?.left?.left?.data).toBe('D');
    expect(tree.root?.left?.right?.data).toBe('E');
  });

  test('should search correctly in BST', () => {
    const tree = new BinaryTree<number>();
    tree.insert(5);
    tree.insert(3);
    tree.insert(7);
    tree.insert(1);
    tree.insert(9);

    const startTime = performance.now();
    const found = tree.search(7);
    const notFound = tree.search(4);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(found?.data).toBe(7);
    expect(notFound).toBeNull();

    console.log(`Search operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should perform BFS traversal correctly', () => {
    const tree = new BinaryTree<number>([1, 2, 3, 4, 5, 6, 7]);
    const result: number[] = [];

    const startTime = performance.now();
    tree.bfs((data) => result.push(data));
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);

    console.log(`BFS traversal: ${executionTime.toFixed(3)} ms`);
  });

  test('should perform DFS traversals correctly', () => {
    const tree = new BinaryTree<number>([1, 2, 3, 4, 5, 6, 7]);

    const inorderResult: number[] = [];
    const preorderResult: number[] = [];
    const postorderResult: number[] = [];

    const startTime = performance.now();
    tree.dfsInorder((data) => inorderResult.push(data));
    tree.dfsPreorder((data) => preorderResult.push(data));
    tree.dfsPostorder((data) => postorderResult.push(data));
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(inorderResult).toEqual([4, 2, 5, 1, 6, 3, 7]);
    expect(preorderResult).toEqual([1, 2, 4, 5, 3, 6, 7]);
    expect(postorderResult).toEqual([4, 5, 2, 6, 7, 3, 1]);

    console.log(`DFS traversals: ${executionTime.toFixed(3)} ms`);
  });

  test('should create deep copy correctly', () => {
    const tree = new BinaryTree<number>([1, 2, 3, 4, 5]);

    const startTime = performance.now();
    const copy = tree.getTreeDeepCopy();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(copy).not.toBeNull();
    expect(copy!.getSize()).toBe(tree.getSize());
    expect(copy!.root!.data).toBe(tree.root!.data);
    expect(copy!.root).not.toBe(tree.root); // Different objects

    console.log(`Deep copy creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should convert to array correctly', () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    const tree = new BinaryTree<number>(items);

    const startTime = performance.now();
    const array = tree.toArray();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(array).toEqual(items);

    console.log(`Tree to array conversion: ${executionTime.toFixed(3)} ms`);
  });

  test('should handle height calculation correctly', () => {
    // Single node
    const singleTree = new BinaryTree<number>([1]);
    expect(singleTree.getHeight()).toBe(0);

    // Balanced tree
    const balancedTree = new BinaryTree<number>([1, 2, 3, 4, 5, 6, 7]);
    expect(balancedTree.getHeight()).toBe(2);

    // Skewed tree
    const skewedTree = new BinaryTree<number>();
    skewedTree.insert(1);
    skewedTree.insert(2);
    skewedTree.insert(3);
    skewedTree.insert(4);
    expect(skewedTree.getHeight()).toBe(3);
  });

  test('should clear tree correctly', () => {
    const tree = new BinaryTree<number>([1, 2, 3, 4, 5]);

    tree.clear();

    expect(tree.isEmpty()).toBe(true);
    expect(tree.getSize()).toBe(0);
    expect(tree.root).toBeNull();
  });

  test('should create from static method', () => {
    const items = [10, 20, 30, 40, 50];

    const startTime = performance.now();
    const tree = BinaryTree.fromArray(items);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(tree.getSize()).toBe(5);
    expect(tree.toArray()).toEqual(items);

    console.log(`Static fromArray creation: ${executionTime.toFixed(3)} ms`);
  });

  test('performance with large dataset', () => {
    const tree = new BinaryTree<number>();
    const dataSize = 1000;

    const startTime = performance.now();
    for (let i = 0; i < dataSize; i++) {
      tree.insert(Math.floor(Math.random() * 10000));
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(tree.getSize()).toBe(dataSize);

    console.log(
      `Large dataset insertion (${dataSize} items): ${executionTime.toFixed(
        3
      )} ms`
    );

    const traversalStartTime = performance.now();
    const result: number[] = [];
    tree.dfsInorder((data) => result.push(data));
    const traversalEndTime = performance.now();
    const traversalExecutionTime = traversalEndTime - traversalStartTime;

    expect(result.length).toBe(dataSize);

    console.log(
      `Large dataset traversal (${dataSize} items): ${traversalExecutionTime.toFixed(
        3
      )} ms`
    );
  });
});
