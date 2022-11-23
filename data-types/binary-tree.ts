import { BinaryTreeNode } from './binary-tree-node'

export class BinaryTree {
  root: BinaryTreeNode

  constructor(args?: any[]) {
    if (args == null) {
      this.root = new BinaryTreeNode(null)
    } else if (args.length == 1) {
      this.root = new BinaryTreeNode(args[0])
    } else if (args.length > 1) {
      this.root = null
      for (let i = 0; i < args.length; i++) {
        const nodeData = args[i]
        this.insert(nodeData)
      }
    }
  };

  // insertInorder(key) {
  //   const tempQueue = new LinkedListNode()
  //   let temp = this.root
  //   tempQueue.push(temp)
  //
  //   // Do level order traversal until we find an empty spot.
  //   while (!tempQueue.length == 0) {
  //     temp = tempQueue.peek()
  //     tempQueue.pop()
  //
  //     if (temp.left == null) {
  //       temp.left = new BinaryTreeNode(key)
  //       break
  //     } else {
  //       tempQueue.push(temp.left)
  //     }
  //
  //     if (temp.right == null) {
  //       temp.right = new BinaryTreeNode(key)
  //       break
  //     } else {
  //       tempQueue.push(temp.right)
  //     }
  //   }
  // }

  insert(d) {
    let pNew = new BinaryTreeNode(d)
    if (this.root == null) {
      this.root = pNew
    } else {
      let parent: BinaryTreeNode = null
      let pTemp: BinaryTreeNode = this.root
      while (pTemp != null) {
        parent = pTemp
        if (d <= pTemp.data) {
          pTemp = pTemp.left
        } else {
          pTemp = pTemp.right
        }
      }
      if (d <= parent.data) {
        parent.left = pNew
        // pNew.parent = parent;
      } else {
        parent.right = pNew
        // pNew.parent = parent;
      }
    }
  }

  insertBT(key) {
    let tempQueue = []
    let temp = this.root

    tempQueue.push(temp)

    // Do level order traversal until we find an empty spot.
    while (tempQueue.length != 0) {
      temp = tempQueue[0]
      tempQueue.shift()

      if (temp.left == null) {
        temp.left = new BinaryTreeNode(key)
        break
      } else {
        tempQueue.push(temp.left)
      }

      if (temp.right == null) {
        temp.right = new BinaryTreeNode(key)
        break
      } else {
        tempQueue.push(temp.right)
      }
    }
  }

  findInBST(node, d) {
    if (!this.root) {
      return null
    }

    if (node.data === d) {
      return node
    } else if (node.data > d) {
      return this.findInBST(node.left, d)
    } else {
      return this.findInBST(node.right, d)
    }
  }

  _populateParentsRec(node, parent) {
    if (!node) {
      return null
    }
    node.parent = parent

    this._populateParentsRec(node.left, node)
    this._populateParentsRec(node.right, node)
  }

  populateParents(node?: BinaryTreeNode) {
    this._populateParentsRec(node, null)
  }


  _getTreeDeepCopyRec(node) {
    if (node != null) {
      let newNode = new BinaryTreeNode(node.data)
      newNode.left = this._getTreeDeepCopyRec(node.left)
      newNode.right = this._getTreeDeepCopyRec(node.right)
      return newNode
    } else {
      return null
    }
  }

  getTreeDeepCopy() {
    if (this.root == null) {
      return null
    } else {
      let treeCopy = new BinaryTree()
      treeCopy.root = this._getTreeDeepCopyRec(this.root)
      return treeCopy
    }
  }
}