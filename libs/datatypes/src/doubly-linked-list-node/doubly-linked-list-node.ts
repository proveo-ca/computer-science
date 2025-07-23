import { LinkedListNode } from '../linked-list-node/linked-list-node.js';

/**
 * Generic Doubly Linked List Node Implementation
 * Time Complexity: O(1) - all operations
 * Space Complexity: O(1) - constant space per node
 */
export class DoublyLinkedListNode<T> extends LinkedListNode<T> {
  public override next: DoublyLinkedListNode<T> | null;
  public prev: DoublyLinkedListNode<T> | null;

  constructor(data: T) {
    super(data);
    this.next = null;
    this.prev = null;
  }

  /**
   * Check if this node has a previous node
   * @returns true if previous node exists
   */
  hasPrev(): boolean {
    return this.prev !== null;
  }

  /**
   * Get the previous node safely
   * @returns previous node or null
   */
  getPrev(): DoublyLinkedListNode<T> | null {
    return this.prev;
  }

  /**
   * Set the previous node
   * @param node - the previous node to link to
   */
  setPrev(node: DoublyLinkedListNode<T> | null): void {
    this.prev = node;
  }

  /**
   * Override getNext to return DoublyLinkedListNode type
   * @returns next node or null
   */
  override getNext(): DoublyLinkedListNode<T> | null {
    return this.next;
  }

  /**
   * Set the next node (doubly linked version)
   * @param node - the next node to link to
   */
  override setNext(node: DoublyLinkedListNode<T> | null): void {
    this.next = node;
  }

  /**
   * Link this node bidirectionally with another node
   * @param nextNode - the node to link as next
   */
  linkNext(nextNode: DoublyLinkedListNode<T> | null): void {
    this.next = nextNode;
    if (nextNode) {
      nextNode.prev = this;
    }
  }

  /**
   * Link this node bidirectionally with a previous node
   * @param prevNode - the node to link as previous
   */
  linkPrev(prevNode: DoublyLinkedListNode<T> | null): void {
    this.prev = prevNode;
    if (prevNode) {
      prevNode.next = this;
    }
  }

  /**
   * Unlink this node from both directions
   */
  unlink(): void {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
    this.prev = null;
    this.next = null;
  }
}
