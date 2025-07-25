import { BinaryTreeNode } from '@proveo/cs-datatypes'

function swapNodes(node: BinaryTreeNode<any>) {
  // Base case: end recursive call if current node is null
  if (!node) {
    return
  }

  //  We will do a post-order traversal of the binary tree.
  if (node.left) {
    swapNodes(node.left)
  }
  if (node.right) {
    swapNodes(node.right)
  }

  //  Let's swap the left and right nodes at current level.
  const temp = node.left
  node.left = node.right
  node.right = temp
}

// Don't need an explicit stack to do an in-order traversal search.
// JS' call stack will do.
export const mirrorBinaryTree = function (root: BinaryTreeNode<any>): BinaryTreeNode<any> {
  swapNodes(root)

  return root
}
