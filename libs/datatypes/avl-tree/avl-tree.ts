import { AVLTreeNode } from '../avl-tree-node/avl-tree-node';

/**
 * AVL Tree - Self-balancing Binary Search Tree
 * Maintains balance factor of at most ±1 for all nodes
 *
 * Time Complexity:
 * - Search: O(log n)
 * - Insert: O(log n)
 * - Delete: O(log n)
 * - Traversal: O(n)
 *
 * Space Complexity: O(n) for storage, O(log n) for recursion stack
 */
export class AVLTree<T> {
  public root: AVLTreeNode<T> | null = null;
  private _size: number = 0;

  constructor() {
    this.root = null;
  }

  /**
   * Get the number of nodes in the tree
   * @returns size of the tree
   */
  get size(): number {
    return this._size;
  }

  /**
   * Check if the tree is empty
   * @returns true if tree has no nodes
   */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Insert a value into the AVL tree
   * Time Complexity: O(log n)
   * @param data - value to insert
   * @returns true if inserted successfully
   */
  insert(data: T): boolean {
    const initialSize = this._size;
    this.root = this._insertNode(this.root, data);
    return this._size > initialSize;
  }

  /**
   * Search for a value in the tree
   * Time Complexity: O(log n)
   * @param data - value to search for
   * @returns true if value exists in tree
   */
  search(data: T): boolean {
    return this._searchNode(this.root, data) !== null;
  }

  /**
   * Delete a value from the tree
   * Time Complexity: O(log n)
   * @param data - value to delete
   * @returns true if value was deleted
   */
  delete(data: T): boolean {
    const initialSize = this._size;
    this.root = this._deleteNode(this.root, data);
    return this._size < initialSize;
  }

  /**
   * Get the minimum value in the tree
   * Time Complexity: O(log n)
   * @returns minimum value or null if tree is empty
   */
  getMin(): T | null {
    if (!this.root) return null;
    const minNode = this._findMin(this.root);
    return minNode.data;
  }

  /**
   * Get the maximum value in the tree
   * Time Complexity: O(log n)
   * @returns maximum value or null if tree is empty
   */
  getMax(): T | null {
    if (!this.root) return null;
    const maxNode = this._findMax(this.root);
    return maxNode.data;
  }

  /**
   * Perform inorder traversal (returns sorted order for BST)
   * Time Complexity: O(n)
   * @returns array of values in inorder sequence
   */
  inorderTraversal(): T[] {
    const result: T[] = [];
    this._inorderTraversal(this.root, result);
    return result;
  }

  /**
   * Perform preorder traversal
   * Time Complexity: O(n)
   * @returns array of values in preorder sequence
   */
  preorderTraversal(): T[] {
    const result: T[] = [];
    this._preorderTraversal(this.root, result);
    return result;
  }

  /**
   * Perform postorder traversal
   * Time Complexity: O(n)
   * @returns array of values in postorder sequence
   */
  postorderTraversal(): T[] {
    const result: T[] = [];
    this._postorderTraversal(this.root, result);
    return result;
  }

  /**
   * Get the height of the tree
   * Time Complexity: O(1)
   * @returns height of the tree (0 for empty tree)
   */
  getHeight(): number {
    return this.root?.height ?? 0;
  }

  /**
   * Check if the tree maintains AVL property
   * Time Complexity: O(n)
   * @returns true if tree is properly balanced
   */
  isBalanced(): boolean {
    return this._isBalanced(this.root);
  }

  // Private helper methods

  private _insertNode(node: AVLTreeNode<T> | null, data: T): AVLTreeNode<T> {
    // Standard BST insertion
    if (!node) {
      this._size++;
      return new AVLTreeNode(data);
    }

    if (data < node.data) {
      node.left = this._insertNode(node.left, data);
      if (node.left) node.left.parent = node;
    } else if (data > node.data) {
      node.right = this._insertNode(node.right, data);
      if (node.right) node.right.parent = node;
    } else {
      // Duplicate values - don't insert
      return node;
    }

    // Update height and rebalance
    node.updateHeight();
    return this._rebalance(node);
  }

  private _deleteNode(
    node: AVLTreeNode<T> | null,
    data: T
  ): AVLTreeNode<T> | null {
    if (!node) return null;

    if (data < node.data) {
      node.left = this._deleteNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._deleteNode(node.right, data);
    } else {
      // Node to delete found
      this._size--;

      // Case 1: No children
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: One child
      if (!node.left) {
        if (node.right) node.right.parent = node.parent;
        return node.right;
      }
      if (!node.right) {
        if (node.left) node.left.parent = node.parent;
        return node.left;
      }

      // Case 3: Two children - replace with inorder successor
      const successor = this._findMin(node.right);
      node.data = successor.data;
      node.right = this._deleteNode(node.right, successor.data);
      this._size++; // Compensate for the extra decrement in recursive call
    }

    // Update height and rebalance
    node.updateHeight();
    return this._rebalance(node);
  }

  private _searchNode(
    node: AVLTreeNode<T> | null,
    data: T
  ): AVLTreeNode<T> | null {
    if (!node || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this._searchNode(node.left, data);
    } else {
      return this._searchNode(node.right, data);
    }
  }

  private _rebalance(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const balanceFactor = node.getBalanceFactor();

    // Left heavy
    if (balanceFactor > 1) {
      // Left-Right case
      if (node.left && node.left.getBalanceFactor() < 0) {
        node.left = this._rotateLeft(node.left);
      }
      // Left-Left case
      return this._rotateRight(node);
    }

    // Right heavy
    if (balanceFactor < -1) {
      // Right-Left case
      if (node.right && node.right.getBalanceFactor() > 0) {
        node.right = this._rotateRight(node.right);
      }
      // Right-Right case
      return this._rotateLeft(node);
    }

    return node;
  }

  private _rotateLeft(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const newRoot = node.right!;
    node.right = newRoot.left;
    newRoot.left = node;

    // Update parent pointers
    newRoot.parent = node.parent;
    node.parent = newRoot;
    if (node.right) node.right.parent = node;

    // Update heights
    node.updateHeight();
    newRoot.updateHeight();

    return newRoot;
  }

  private _rotateRight(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const newRoot = node.left!;
    node.left = newRoot.right;
    newRoot.right = node;

    // Update parent pointers
    newRoot.parent = node.parent;
    node.parent = newRoot;
    if (node.left) node.left.parent = node;

    // Update heights
    node.updateHeight();
    newRoot.updateHeight();

    return newRoot;
  }

  private _findMin(node: AVLTreeNode<T>): AVLTreeNode<T> {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  private _findMax(node: AVLTreeNode<T>): AVLTreeNode<T> {
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  private _inorderTraversal(node: AVLTreeNode<T> | null, result: T[]): void {
    if (node) {
      this._inorderTraversal(node.left, result);
      result.push(node.data);
      this._inorderTraversal(node.right, result);
    }
  }

  private _preorderTraversal(node: AVLTreeNode<T> | null, result: T[]): void {
    if (node) {
      result.push(node.data);
      this._preorderTraversal(node.left, result);
      this._preorderTraversal(node.right, result);
    }
  }

  private _postorderTraversal(node: AVLTreeNode<T> | null, result: T[]): void {
    if (node) {
      this._postorderTraversal(node.left, result);
      this._postorderTraversal(node.right, result);
      result.push(node.data);
    }
  }

  private _isBalanced(node: AVLTreeNode<T> | null): boolean {
    if (!node) return true;

    const balanceFactor = node.getBalanceFactor();
    if (Math.abs(balanceFactor) > 1) return false;

    return this._isBalanced(node.left) && this._isBalanced(node.right);
  }
}
