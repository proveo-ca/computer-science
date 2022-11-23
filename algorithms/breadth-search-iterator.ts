import { Queue } from 'data-types/queue'
import { BinaryTreeNode } from 'data-types/binary-tree-node'

// For a breadth search iterations, we'll use 2 queues.
// The current queue describes the current level, and we'll be enqueuing children
// Onto the next queue, until the current level is empty. We'll swap the queues references
// To iterate, until the current queue is empty:
export const breadthSearchIterator = function (root: BinaryTreeNode) {
  let treeString = ''

  if (!root || (!root.data && !root.left && !root.right)) {
    treeString += 'null'
  } else {
    let queues = [
      new Queue<BinaryTreeNode>(),
      new Queue<BinaryTreeNode>(),
    ]

    let currentQueue = queues[0]
    let nextQueue = queues[1]
    let levelNumber = 0

    currentQueue.enqueue(root)
    // Printing nodes in level-order until the current queue remains empty
    while (currentQueue.items.length > 0) {
      let currentNode = currentQueue.dequeue()
      treeString += String(currentNode.data)

      // Adding dequeued node's children to the next queue
      if (currentNode.left) {
        nextQueue.enqueue(currentNode.left)
      }

      if (currentNode.right) {
        nextQueue.enqueue(currentNode.right)
      }

      // When the current queue is empty, we increase the level, print a new line
      // and swap the current and next queues
      if (currentQueue.items.length == 0) {
        ++levelNumber
        if (nextQueue.items.length != 0) {
          treeString += ' : '
        }
        currentQueue = queues[levelNumber % 2]
        nextQueue = queues[(levelNumber + 1) % 2]
      } else {
        treeString += ', '
      }
    }
  }
  return treeString
}
