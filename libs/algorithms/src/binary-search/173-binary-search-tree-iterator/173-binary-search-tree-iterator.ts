import { Stack } from '@proveo/cs-datatypes'
import { BinaryTreeNode } from '@proveo/cs-datatypes'

// Depth search first:
// A stack will be filled from the root to the leftmost node, then at every node popped out
// we check if it has a right node, and stack all the way to its leftmost node
class InOrderIterator {
  depthStack: Stack<any>

  constructor(root: BinaryTreeNode<any>) {
    this.depthStack = new Stack()
    // Assuming that when iterator is initialized
    // it is always at the first element of tree in its in-order
    this.populateStack(root)
  }

  // Function to populate the stack from the root till the left-most node
  populateStack(root: BinaryTreeNode<any>) {
    while (root) {
      this.depthStack.push(root)
      root = root.left!
    }
  }

  // This function checks if there is a node next in line inside the iterator
  hasNext() {
    if (!this.depthStack || this.depthStack.size() === 0) {
      return false
    } else {
      return true
    }
  }

  // getNext returns null if there are no more elements in tree
  getNext() {
    // Return null if there's no succeeding node to return
    if (!this.depthStack || this.depthStack.size() === 0) {
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
export const depthSearchIterator = function (root: BinaryTreeNode<any> | null): string {
  let treeString = ''

  if (!root || (!root.data && !root.left && !root.right)) {
    treeString += 'undefined'
  }
  const iterator = new InOrderIterator(root!)
  while (iterator.hasNext()) {
    const currentTreeNode = iterator.getNext()
    if (iterator.hasNext()) {
      treeString += currentTreeNode.data + ', '
    } else {
      treeString += currentTreeNode.data
    }
  }
  if (treeString === '') {
    treeString = 'undefined'
  }
  return treeString
}
