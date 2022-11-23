import { Stack } from 'data-types/stack'
import { BinaryTreeNode } from 'data-types/binary-tree-node'

// Depth search first:
// A stack will be filled from the root to the leftmost node, then at every node popped out
// we check if it has a right node, and stack all the way to its leftmost node
class InOrderIterator {
  depthStack: Stack

  constructor(root: BinaryTreeNode) {
    this.depthStack = new Stack()
    // Assuming that when iterator is initialized
    // it is always at the first element of tree in its in-order
    this.populateStack(root)
  }

  // Function to populate the stack from the root till the left-most node
  populateStack(root) {
    while (root) {
      this.depthStack.push(root)
      root = root.left
    }
  }

  // This function checks if there is a node next in line inside the iterator
  hasNext() {
    if (!this.depthStack || this.depthStack.items.length === 0) {
      return false
    } else {
      return true
    }
  }

  // getNext returns null if there are no more elements in tree
  getNext() {
    // Return null if there's no succeeding node to return
    if (!this.depthStack || this.depthStack.items.length === 0) {
      return null
    }

    // Extracting and popping the next node from the stack
    const leftTreeNode = this.depthStack.pop()
    const rightChildNode = leftTreeNode.right
    this.populateStack(rightChildNode)

    // Returning the next node
    return leftTreeNode
  }

}

// This function returns the in-order list of nodes using the hasNext() and
// getNext() methods
export const depthSearchIterator = function (root: BinaryTreeNode): string {
  const iterator = new InOrderIterator(root)
  let treeString = ''
  while (iterator.hasNext()) {
    const currentTreeNode = iterator.getNext()
    if (iterator.hasNext()) {
      treeString += currentTreeNode.data + ', '
    } else {
      treeString += currentTreeNode.data
    }
  }
  if (treeString === '') {
    treeString = 'null'
  }
  return treeString
}