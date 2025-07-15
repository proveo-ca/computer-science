import { describe, test, expect } from 'bun:test';
import { AVLTree } from './avl-tree';

describe('AVLTree', () => {
  test('should create an empty tree', () => {
    const tree = new AVLTree<number>();

    expect(tree.isEmpty).toBe(true);
    expect(tree.size).toBe(0);
    expect(tree.getHeight()).toBe(0);
    expect(tree.root).toBe(null);
  });

  test('should insert single element', () => {
    const tree = new AVLTree<number>();
    const startTime = performance.now();

    const inserted = tree.insert(10);

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(inserted).toBe(true);
    expect(tree.size).toBe(1);
    expect(tree.getHeight()).toBe(1);
    expect(tree.search(10)).toBe(true);
    expect(tree.isBalanced()).toBe(true);

    console.log(`Single insert: ${executionTime.toFixed(3)} ms`);
  });

  test('should maintain balance during insertions', () => {
    const tree = new AVLTree<number>();
    const values = [10, 20, 30, 40, 50, 25];

    const startTime = performance.now();

    for (const value of values) {
      tree.insert(value);
      expect(tree.isBalanced()).toBe(true);
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(tree.size).toBe(6);
    expect(tree.getHeight()).toBeLessThanOrEqual(Math.ceil(Math.log2(6 + 1)));

    console.log(
      `Balanced insertions (${values.length} items): ${executionTime.toFixed(
        3
      )} ms`
    );
  });

  test('should perform correct rotations', () => {
    const tree = new AVLTree<number>();

    // Test right rotation (Left-Left case)
    tree.insert(30);
    tree.insert(20);
    tree.insert(10); // Should trigger right rotation

    expect(tree.root?.data).toBe(20);
    expect(tree.root?.left?.data).toBe(10);
    expect(tree.root?.right?.data).toBe(30);
    expect(tree.isBalanced()).toBe(true);
  });

  test('should handle deletions while maintaining balance', () => {
    const tree = new AVLTree<number>();
    const values = [50, 30, 70, 20, 40, 60, 80];

    // Insert values
    for (const value of values) {
      tree.insert(value);
    }

    const startTime = performance.now();

    // Delete some values
    expect(tree.delete(20)).toBe(true);
    expect(tree.isBalanced()).toBe(true);

    expect(tree.delete(30)).toBe(true);
    expect(tree.isBalanced()).toBe(true);

    expect(tree.delete(50)).toBe(true);
    expect(tree.isBalanced()).toBe(true);

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(tree.size).toBe(4);
    expect(tree.search(20)).toBe(false);
    expect(tree.search(30)).toBe(false);
    expect(tree.search(50)).toBe(false);

    console.log(`Balanced deletions: ${executionTime.toFixed(3)} ms`);
  });

  test('should return correct min and max values', () => {
    const tree = new AVLTree<number>();
    const values = [50, 30, 70, 20, 40, 60, 80];

    for (const value of values) {
      tree.insert(value);
    }

    expect(tree.getMin()).toBe(20);
    expect(tree.getMax()).toBe(80);
  });

  test('should perform inorder traversal correctly', () => {
    const tree = new AVLTree<number>();
    const values = [50, 30, 70, 20, 40, 60, 80];

    for (const value of values) {
      tree.insert(value);
    }

    const inorder = tree.inorderTraversal();
    expect(inorder).toEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  test('should handle duplicate insertions', () => {
    const tree = new AVLTree<number>();

    expect(tree.insert(10)).toBe(true);
    expect(tree.insert(10)).toBe(false); // Duplicate
    expect(tree.size).toBe(1);
  });

  test('should handle edge cases', () => {
    const tree = new AVLTree<number>();

    expect(tree.getMin()).toBe(null);
    expect(tree.getMax()).toBe(null);
    expect(tree.delete(10)).toBe(false);
    expect(tree.search(10)).toBe(false);
    expect(tree.inorderTraversal()).toEqual([]);
  });

  test('performance with large dataset', () => {
    const tree = new AVLTree<number>();
    const dataSize = 1000;

    const startTime = performance.now();

    // Insert sequential numbers (worst case for unbalanced tree)
    for (let i = 0; i < dataSize; i++) {
      tree.insert(i);
    }

    const insertEndTime = performance.now();
    const insertTime = insertEndTime - startTime;

    expect(tree.size).toBe(dataSize);
    expect(tree.isBalanced()).toBe(true);
    expect(tree.getHeight()).toBeLessThanOrEqual(
      Math.ceil(1.44 * Math.log2(dataSize + 2))
    ); // AVL height bound

    // Test search performance
    const searchStartTime = performance.now();

    for (let i = 0; i < 100; i++) {
      const randomValue = Math.floor(Math.random() * dataSize);
      expect(tree.search(randomValue)).toBe(true);
    }

    const searchEndTime = performance.now();
    const searchTime = searchEndTime - searchStartTime;

    console.log(
      `Large dataset insertion (${dataSize} items): ${insertTime.toFixed(3)} ms`
    );
    console.log(
      `Search operations (100 searches): ${searchTime.toFixed(3)} ms`
    );
    console.log(
      `Tree height: ${tree.getHeight()}, Optimal height: ~${Math.ceil(
        Math.log2(dataSize + 1)
      )}`
    );
  });

  test('should maintain AVL property under stress', () => {
    const tree = new AVLTree<number>();
    const operations = 500;

    const startTime = performance.now();

    // Random insertions and deletions
    const values = new Set<number>();

    for (let i = 0; i < operations; i++) {
      const value = Math.floor(Math.random() * 1000);

      if (Math.random() < 0.7) {
        // 70% insertions
        tree.insert(value);
        values.add(value);
      } else {
        // 30% deletions
        if (values.size > 0) {
          const valueArray = Array.from(values);
          const randomValue =
            valueArray[Math.floor(Math.random() * valueArray.length)];
          tree.delete(randomValue);
          values.delete(randomValue);
        }
      }

      // Verify balance after each operation
      expect(tree.isBalanced()).toBe(true);
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(tree.size).toBe(values.size);

    console.log(
      `Stress test (${operations} operations): ${executionTime.toFixed(3)} ms`
    );
    console.log(`Final tree size: ${tree.size}, height: ${tree.getHeight()}`);
  });
});
