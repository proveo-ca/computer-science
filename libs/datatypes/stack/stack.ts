/**
 * Generic Stack Implementation using Array
 * Follows LIFO (Last In, First Out) principle
 * Time Complexity: O(1) - push, pop, peek, isEmpty
 * Space Complexity: O(n) - where n is the number of elements
 */
export class Stack<T> {
  private _items: T[] = [];
  private _top: T | undefined;

  constructor(initialCapacity?: number) {
    if (initialCapacity && initialCapacity > 0) {
      this._items = new Array(initialCapacity);
      this._items.length = 0; // Reset length to 0 for proper behavior
    }
  }

  /**
   * Get the current size of the stack
   * @returns number of elements in the stack
   */
  size(): number {
    return this._items.length;
  }

  /**
   * Push an element onto the top of the stack
   * @param element - element to push
   */
  push(element: T): void {
    this._items.push(element);
    this._top = element;
  }

  /**
   * Remove and return the top element from the stack
   * @returns the top element or undefined if stack is empty
   * @throws Error if stack is empty
   */
  pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty - cannot pop');
    }
    const poppedElement = this._items.pop()!;
    this._top =
      this._items.length > 0 ? this._items[this._items.length - 1] : undefined;
    return poppedElement;
  }

  /**
   * Return the top element without removing it
   * @returns the top element or undefined if stack is empty
   */
  peek(): T | undefined {
    return this._top;
  }

  /**
   * Check if the stack is empty
   * @returns true if stack is empty
   */
  isEmpty(): boolean {
    return this._items.length === 0;
  }

  /**
   * Clear all elements from the stack
   */
  clear(): void {
    this._items = [];
    this._top = undefined;
  }

  /**
   * Convert stack to array (top to bottom order)
   * @returns array representation of stack
   */
  toArray(): T[] {
    return [...this._items].reverse();
  }

  /**
   * Create a stack from an array
   * @param items - array of items to add to stack
   * @returns new Stack instance
   */
  static fromArray<T>(items: T[]): Stack<T> {
    const stack = new Stack<T>();
    for (const item of items) {
      stack.push(item);
    }
    return stack;
  }

  /**
   * Get string representation of the stack
   * @returns string representation
   */
  toString(): string {
    return `Stack(${this._items.length}): [${this.toArray().join(', ')}]`;
  }
}
