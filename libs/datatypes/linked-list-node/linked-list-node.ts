/**
 * Generic Linked List Node Implementation
 * Time Complexity: O(1) - all operations
 * Space Complexity: O(1) - constant space per node
 */
export class LinkedListNode<T> {
  public data: T;
  public next: LinkedListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }

  /**
   * Check if this node has a next node
   * @returns true if next node exists
   */
  hasNext(): boolean {
    return this.next !== null;
  }

  /**
   * Get the next node safely
   * @returns next node or null
   */
  getNext(): LinkedListNode<T> | null {
    return this.next;
  }

  /**
   * Set the next node
   * @param node - the next node to link to
   */
  setNext(node: LinkedListNode<T> | null): void {
    this.next = node;
  }

  /**
   * Get the data stored in this node
   * @returns the data value
   */
  getData(): T {
    return this.data;
  }

  /**
   * Set the data for this node
   * @param data - the new data value
   */
  setData(data: T): void {
    this.data = data;
  }
}
