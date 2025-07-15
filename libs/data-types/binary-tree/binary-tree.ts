import { BinaryTreeNode } from '../binary-tree-node/binary-tree-node';
import { Queue } from '../queue/queue';

/**
 * Generic Binary Tree Implementation
 * Time Complexity: O(n) - traversal operations
 * Time Complexity: O(log n) - search, insert, delete (balanced tree)
 * Time Complexity: O(n) - search, insert, delete (worst case - skewed tree)
 * Space Complexity: O(n) - where n is the number of nodes
 */
export class BinaryTree<T> {
  public root: BinaryTreeNode<T> | null = null;

  constructor(args?: T[]) {
    if (args == null || args.length === 0) {
      this.root = null;
    } else if (args.length === 1) {
      this.root = new BinaryTreeNode(args[0]);
    } else {
      this.buildFromArray(args);
    }
  }

  /**
   * Build tree from array using level-order insertion
   * @param args - array of values to insert
   */
  buildFromArray(args: T[]): void {
    if (args.length === 0) return;

    this.root = new BinaryTreeNode(args[0]);
    const queue = new Queue<BinaryTreeNode<T>>();
    queue.enqueue(this.root);
    let i = 1;

    while (!queue.isEmpty() && i < args.length) {
      const current = queue.dequeue();

      if (i < args.length && args[i] !== null && args[i] !== undefined) {
        current.setLeft(new BinaryTreeNode(args[i]));
        queue.enqueue(current.left!);
      }
      i++;

      if (i < args.length && args[i] !== null && args[i] !== undefined) {
        current.setRight(new BinaryTreeNode(args[i]));
        queue.enqueue(current.right!);
      }
      i++;
    }
  }

  /**
   * Insert a value into the binary search tree
   * @param data - value to insert
   */
  insert(data: T): void {
    const newNode = new BinaryTreeNode(data);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let parent: BinaryTreeNode<T> | null = null;
    let current: BinaryTreeNode<T> | null = this.root;

    while (current !== null) {
      parent = current;
      if (data <= current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (data <= parent!.data) {
      parent!.setLeft(newNode);
    } else {
      parent!.setRight(newNode);
    }
  }

  /**
   * Insert a value using level-order insertion (complete binary tree)
   * @param data - value to insert
   */
  insertBT(data: T): void {
    const newNode = new BinaryTreeNode(data);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const queue = new Queue<BinaryTreeNode<T>>();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      if (current.left === null) {
        current.setLeft(newNode);
        break;
      } else {
        queue.enqueue(current.left);
      }

      if (current.right === null) {
        current.setRight(newNode);
        break;
      } else {
        queue.enqueue(current.right);
      }
    }
  }

  /**
   * Search for a value in the binary search tree
   * @param data - value to search for
   * @returns the node containing the value or null if not found
   */
  search(data: T): BinaryTreeNode<T> | null {
    return this.searchHelper(this.root, data);
  }

  private searchHelper(
    node: BinaryTreeNode<T> | null,
    data: T
  ): BinaryTreeNode<T> | null {
    if (!node || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this.searchHelper(node.left, data);
    } else {
      return this.searchHelper(node.right, data);
    }
  }

  /**
   * Check if the tree is empty
   * @returns true if tree is empty
   */
  isEmpty(): boolean {
    return this.root === null;
  }

  /**
   * Get the height of the tree
   * @returns height of the tree
   */
  getHeight(): number {
    return this.root ? this.root.getHeight() : -1;
  }

  /**
   * Get the size of the tree
   * @returns number of nodes in the tree
   */
  getSize(): number {
    return this.root ? this.root.getSize() : 0;
  }

  /**
   * Breadth-First Search (Level Order) traversal
   * @param callback - function to call for each node
   */
  bfs(callback: (data: T) => void): void {
    if (!this.root) return;

    const queue = new Queue<BinaryTreeNode<T>>();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      callback(current.data);

      if (current.left) {
        queue.enqueue(current.left);
      }
      if (current.right) {
        queue.enqueue(current.right);
      }
    }
  }

  /**
   * Depth-First Search - Inorder traversal (Left, Root, Right)
   * @param callback - function to call for each node
   */
  dfsInorder(callback: (data: T) => void): void {
    this.inorderHelper(this.root, callback);
  }

  private inorderHelper(
    node: BinaryTreeNode<T> | null,
    callback: (data: T) => void
  ): void {
    if (node) {
      this.inorderHelper(node.left, callback);
      callback(node.data);
      this.inorderHelper(node.right, callback);
    }
  }

  /**
   * Depth-First Search - Preorder traversal (Root, Left, Right)
   * @param callback - function to call for each node
   */
  dfsPreorder(callback: (data: T) => void): void {
    this.preorderHelper(this.root, callback);
  }

  private preorderHelper(
    node: BinaryTreeNode<T> | null,
    callback: (data: T) => void
  ): void {
    if (node) {
      callback(node.data);
      this.preorderHelper(node.left, callback);
      this.preorderHelper(node.right, callback);
    }
  }

  /**
   * Depth-First Search - Postorder traversal (Left, Right, Root)
   * @param callback - function to call for each node
   */
  dfsPostorder(callback: (data: T) => void): void {
    this.postorderHelper(this.root, callback);
  }

  private postorderHelper(
    node: BinaryTreeNode<T> | null,
    callback: (data: T) => void
  ): void {
    if (node) {
      this.postorderHelper(node.left, callback);
      this.postorderHelper(node.right, callback);
      callback(node.data);
    }
  }

  /**
   * Get a deep copy of the tree
   * @returns a new BinaryTree instance that is a deep copy
   */
  getTreeDeepCopy(): BinaryTree<T> | null {
    if (this.root === null) {
      return null;
    }

    const treeCopy = new BinaryTree<T>();
    treeCopy.root = this.getTreeDeepCopyHelper(this.root);
    return treeCopy;
  }

  private getTreeDeepCopyHelper(
    node: BinaryTreeNode<T> | null
  ): BinaryTreeNode<T> | null {
    if (node !== null) {
      const newNode = new BinaryTreeNode(node.data);
      newNode.left = this.getTreeDeepCopyHelper(node.left);
      newNode.right = this.getTreeDeepCopyHelper(node.right);

      // Update parent references
      if (newNode.left) {
        newNode.left.parent = newNode;
      }
      if (newNode.right) {
        newNode.right.parent = newNode;
      }

      return newNode;
    }
    return null;
  }

  /**
   * Convert tree to array using level-order traversal
   * @returns array representation of the tree
   */
  toArray(): (T | null)[] {
    if (!this.root) return [];

    const result: (T | null)[] = [];
    const queue = new Queue<BinaryTreeNode<T> | null>();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      if (current) {
        result.push(current.data);
        queue.enqueue(current.left);
        queue.enqueue(current.right);
      } else {
        result.push(null);
      }
    }

    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
      result.pop();
    }

    return result;
  }

  /**
   * Clear all nodes from the tree
   */
  clear(): void {
    this.root = null;
  }

  /**
   * Get string representation of the tree
   * @returns string representation
   */
  toString(): string {
    return `BinaryTree(${this.getSize()}): [${this.toArray().join(', ')}]`;
  }

  /**
   * Create a binary tree from an array
   * @param items - array of items to build tree from
   * @returns new BinaryTree instance
   */
  static fromArray<T>(items: T[]): BinaryTree<T> {
    return new BinaryTree<T>(items);
  }
}
