import { describe, expect, it } from 'bun:test'
import { BinaryTree } from '@proveo/cs-datatypes'
import { depthSearchIterator } from './173-binary-search-tree-iterator.js'

describe('Depth Search Iterator (In-Order Trasversal) tests', () => {
  it('should handle undefined values', () => {
    const tree = new BinaryTree(undefined)

    expect(depthSearchIterator(tree.root)).toBe('undefined')
  })
  it('should handle single nodes', () => {
    const tree = new BinaryTree([100])

    expect(depthSearchIterator(tree.root)).toBe('100')
  })

  it('should handle a left degenerate binary search tree', () => {
    const tree = new BinaryTree([300, 200, 125, 100, 75, 60, 50, 35, 25, 12])

    expect(depthSearchIterator(tree.root)).toBe('12, 25, 35, 50, 60, 75, 100, 125, 200, 300')
  })
  it('should handle a right degenerate binary search tree', () => {
    const tree = new BinaryTree([12, 25, 35, 50, 60, 75, 100, 125, 200, 300])

    expect(depthSearchIterator(tree.root)).toBe('12, 25, 35, 50, 60, 75, 100, 125, 200, 300')
  })
  it('should handle a normal binary search tree', () => {
    const tree = new BinaryTree([100, 50, 200, 25, 75, 125, 300, 12, 35, 60])

    expect(depthSearchIterator(tree.root)).toBe('12, 25, 35, 50, 60, 75, 100, 125, 200, 300')
  })
})
