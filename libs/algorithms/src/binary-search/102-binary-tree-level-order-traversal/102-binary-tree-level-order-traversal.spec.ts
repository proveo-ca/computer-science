import { describe, expect, it } from 'bun:test'
import { BinaryTree } from '@proveo/cs-datatypes'
import { breadthSearchIterator } from './102-binary-tree-level-order-traversal.js'

describe('Breadth Search Iterator (Level-order Traversal) tests', () => {
  it('should handle an undefined tree', () => {
    const tree = new BinaryTree(undefined)

    expect(breadthSearchIterator(tree.root)).toBe('undefined')
  })
  it('should handle a single node binary tree: ', () => {
    const tree = new BinaryTree([100])

    expect(breadthSearchIterator(tree.root)).toBe(('100'))
  })
  it('should handle a left degenerate binary search tree:', () => {
    const tree = new BinaryTree([350, 200, 75, 100, 50, 25])

    expect(breadthSearchIterator(tree.root)).toBe('350 : 200 : 75 : 50, 100 : 25')
  })
  it('should handle a right degenerate binary search tree: ', () => {
    const tree = new BinaryTree([100, 50, 200, 25, 75, 350])

    expect(breadthSearchIterator(tree.root)).toBe('100 : 50, 200 : 25, 75, 350')
  })
  it('should handle a normal binary search tree: ', () => {
    const tree = new BinaryTree([100, 50, 200, 25, 75, 125, 300, 12, 35, 60])

    expect(breadthSearchIterator(tree.root)).toBe('100 : 50, 200 : 25, 75, 125, 300 : 12, 35, 60')
  })
})
