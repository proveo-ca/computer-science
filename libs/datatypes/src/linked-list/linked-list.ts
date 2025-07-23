import { LinkedListNode } from '../linked-list-node/linked-list-node.js';

/**
 * Generic Singly Linked List Implementation
 * Time Complexity: O(1) - insertAtHead, removeHead
 * Time Complexity: O(n) - insertAtTail, search, removeByValue
 * Space Complexity: O(n) - where n is the number of elements
 */
export class LinkedList<T> {
  public head: LinkedListNode<T> | null;
  public length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  /**
   * Check if the list is empty
   * @returns true if list is empty
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Get the size of the list
   * @returns number of elements in the list
   */
  size(): number {
    return this.length;
  }

  /**
   * Insert an element at the head of the list
   * @param data - element to insert
   */
  insertAtHead(data: T): void {
    const newNode = new LinkedListNode<T>(data);
    newNode.setNext(this.head);
    this.head = newNode;
    this.length++;
  }

  /**
   * Remove and return the element at the head
   * @returns the head element or null if empty
   */
  removeHead(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const data = this.head!.getData();
    this.head = this.head!.getNext();
    this.length--;
    return data;
  }

  /**
   * Search for an element in the list
   * @param data - element to search for
   * @returns the node containing the element or null if not found
   */
  search(data: T): LinkedListNode<T> | null {
    let current = this.head;

    while (current) {
      if (current.getData() === data) {
        return current;
      }
      current = current.getNext();
    }

    return null;
  }

  /**
   * Remove the first occurrence of an element
   * @param data - element to remove
   * @returns true if element was removed, false if not found
   */
  removeByValue(data: T): boolean {
    if (this.isEmpty()) {
      return false;
    }

    // If head contains the data
    if (this.head!.getData() === data) {
      this.removeHead();
      return true;
    }

    let current = this.head!;
    while (current.hasNext()) {
      if (current.getNext()!.getData() === data) {
        const nodeToRemove = current.getNext()!;
        current.setNext(nodeToRemove.getNext());
        this.length--;
        return true;
      }
      current = current.getNext()!;
    }

    return false;
  }

  /**
   * Convert list to array
   * @returns array representation of the list
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.getData());
      current = current.getNext();
    }

    return result;
  }

  /**
   * Create a linked list from an array
   * @param items - array of items to add to list
   * @returns new LinkedList instance
   */
  static fromArray<T>(items: T[]): LinkedList<T> {
    const list = new LinkedList<T>();
    for (let i = items.length - 1; i >= 0; i--) {
      list.insertAtHead(items[i]);
    }
    return list;
  }

  /**
   * Create a linked list from an array (instance method)
   * @param array - array of items to add to list
   */
  fromArray(array: T[]): void {
    this.clear();
    for (let i = array.length - 1; i >= 0; i--) {
      this.insertAtHead(array[i]);
    }
  }

  /**
   * Clear all elements from the list
   */
  clear(): void {
    this.head = null;
    this.length = 0;
  }

  /**
   * Get string representation of the list
   * @returns string representation
   */
  toString(): string {
    return `LinkedList(${this.length}): [${this.toArray().join(' -> ')}]`;
  }

  /**
   * Print the list (legacy method for compatibility)
   * @param head - optional head node to start from
   * @returns string representation
   */
  print(head?: LinkedListNode<T> | null): string {
    const startNode = head || this.head;
    let temp = startNode;
    let s = '';
    while (temp) {
      s += temp.getData();
      temp = temp.getNext();
      if (temp) {
        s += ', ';
      }
    }
    return s;
  }

  /**
   * Iterator for the list
   */
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) {
      yield current.getData();
      current = current.getNext();
    }
  }

  /**
   * Reverse the linked list in place
   */
  reverse(): void {
    if (this.isEmpty() || this.length === 1) {
      return;
    }

    let prev: LinkedListNode<T> | null = null;
    let current = this.head;
    let next: LinkedListNode<T> | null = null;

    while (current) {
      next = current.getNext();
      current.setNext(prev);
      prev = current;
      current = next;
    }

    this.head = prev;
  }
}
