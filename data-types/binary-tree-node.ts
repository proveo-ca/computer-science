export class BinaryTreeNode {
  data: any;
  left: BinaryTreeNode;
  right: BinaryTreeNode;
  next: BinaryTreeNode;
  parent: BinaryTreeNode;
  count: number;

  constructor(data: any) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.next = null;
    this.parent = null;
    this.count = 0;
  }
}