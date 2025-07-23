import { BinaryTreeNode } from '../binary-tree-node/binary-tree-node.js';

/**
 * AVL Tree Node - extends BinaryTreeNode with height tracking for self-balancing
 * Time Complexity: O(1) for all node operations
 * Space Complexity: O(1) additional space for height property
 */
export class AVLTreeNode<T> extends BinaryTreeNode<T> {
  public override left: AVLTreeNode<T> | null = null;
  public override right: AVLTreeNode<T> | null = null;
  public override parent: AVLTreeNode<T> | null = null;
  public height: number = 1;

  constructor(data: T) {
    super(data);
  }

  /**
   * Get the balance factor of this node
   * Balance factor = height(left) - height(right)
   * @returns balance factor (-2 to +2 range for AVL property)
   */
  getBalanceFactor(): number {
    const leftHeight = this.left?.height ?? 0;
    const rightHeight = this.right?.height ?? 0;
    return leftHeight - rightHeight;
  }

  /**
   * Update the height of this node based on children heights
   * Height = 1 + max(left_height, right_height)
   */
  updateHeight(): void {
    const leftHeight = this.left?.height ?? 0;
    const rightHeight = this.right?.height ?? 0;
    this.height = 1 + Math.max(leftHeight, rightHeight);
  }

  /**
   * Check if this node violates AVL property (balance factor > 1 or < -1)
   * @returns true if node is unbalanced
   */
  isUnbalanced(): boolean {
    const balanceFactor = this.getBalanceFactor();
    return Math.abs(balanceFactor) > 1;
  }

  /**
   * Override setLeft to maintain parent relationships and update height
   */
  override setLeft(node: AVLTreeNode<T> | null): void {
    this.left = node;
    if (node) {
      node.parent = this;
    }
    this.updateHeight();
  }

  /**
   * Override setRight to maintain parent relationships and update height
   */
  override setRight(node: AVLTreeNode<T> | null): void {
    this.right = node;
    if (node) {
      node.parent = this;
    }
    this.updateHeight();
  }
}
