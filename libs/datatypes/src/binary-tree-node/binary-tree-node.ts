/**
 * Generic Binary Tree Node Implementation
 * Time Complexity: O(1) - all basic operations
 * Space Complexity: O(1) - constant space per node
 */
export class BinaryTreeNode<T> {
  public data: T;
  public left: BinaryTreeNode<T> | null;
  public right: BinaryTreeNode<T> | null;
  public next: BinaryTreeNode<T> | null; // For level-order linking
  public parent: BinaryTreeNode<T> | null;
  public count: number; // For duplicate handling

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.next = null;
    this.parent = null;
    this.count = 1; // Initialize to 1 for the first occurrence
  }

  /**
   * Check if this node is a leaf (has no children)
   * @returns true if node has no children
   */
  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  /**
   * Check if this node has a left child
   * @returns true if left child exists
   */
  hasLeft(): boolean {
    return this.left !== null;
  }

  /**
   * Check if this node has a right child
   * @returns true if right child exists
   */
  hasRight(): boolean {
    return this.right !== null;
  }

  /**
   * Check if this node has both children
   * @returns true if both children exist
   */
  hasBothChildren(): boolean {
    return this.left !== null && this.right !== null;
  }

  /**
   * Get the height of the subtree rooted at this node
   * @returns height of the subtree
   */
  getHeight(): number {
    if (this.isLeaf()) {
      return 0;
    }

    const leftHeight = this.left ? this.left.getHeight() : -1;
    const rightHeight = this.right ? this.right.getHeight() : -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /**
   * Get the size of the subtree rooted at this node
   * @returns number of nodes in subtree
   */
  getSize(): number {
    let size = this.count;

    if (this.left) {
      size += this.left.getSize();
    }

    if (this.right) {
      size += this.right.getSize();
    }

    return size;
  }

  /**
   * Set the left child and update parent reference
   * @param node - the left child node
   */
  setLeft(node: BinaryTreeNode<T> | null): void {
    this.left = node;
    if (node) {
      node.parent = this;
    }
  }

  /**
   * Set the right child and update parent reference
   * @param node - the right child node
   */
  setRight(node: BinaryTreeNode<T> | null): void {
    this.right = node;
    if (node) {
      node.parent = this;
    }
  }

  /**
   * Find the minimum node in the subtree rooted at this node
   * @returns the node with minimum value
   */
  findMin(): BinaryTreeNode<T> {
    let current: BinaryTreeNode<T> = this;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  /**
   * Find the maximum node in the subtree rooted at this node
   * @returns the node with maximum value
   */
  findMax(): BinaryTreeNode<T> {
    let current: BinaryTreeNode<T> = this;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  /**
   * Find the inorder successor of this node
   * @returns the inorder successor node or null
   */
  findSuccessor(): BinaryTreeNode<T> | null {
    // If right subtree exists, successor is the leftmost node in right subtree
    if (this.right) {
      return this.right.findMin();
    }

    // Otherwise, go up until we find a node that is left child of its parent
    let current: BinaryTreeNode<T> | null = this;
    let parent = this.parent;

    while (parent && current === parent.right) {
      current = parent;
      parent = parent.parent;
    }

    return parent;
  }

  /**
   * Find the inorder predecessor of this node
   * @returns the inorder predecessor node or null
   */
  findPredecessor(): BinaryTreeNode<T> | null {
    // If left subtree exists, predecessor is the rightmost node in left subtree
    if (this.left) {
      return this.left.findMax();
    }

    // Otherwise, go up until we find a node that is right child of its parent
    let current: BinaryTreeNode<T> | null = this;
    let parent = this.parent;

    while (parent && current === parent.left) {
      current = parent;
      parent = parent.parent;
    }

    return parent;
  }

  /**
   * Increment the count for duplicate handling
   */
  incrementCount(): void {
    this.count++;
  }

  /**
   * Decrement the count for duplicate handling
   */
  decrementCount(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  /**
   * Get string representation of the node
   * @returns string representation
   */
  toString(): string {
    return `BinaryTreeNode(${this.data}${
      this.count > 1 ? ` x${this.count}` : ''
    })`;
  }
}
