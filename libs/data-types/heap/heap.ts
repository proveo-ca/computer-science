/**
 * Abstract Heap Implementation using Array
 * Time Complexity: O(log n) - insert, delete, heapify
 * Time Complexity: O(1) - peek
 * Space Complexity: O(n) - where n is the number of elements
 */
export abstract class Heap<T> {
  protected items: T[] = [];
  protected _size: number = 0;
  protected capacity: number;

  constructor(capacity: number = 100) {
    this.capacity = capacity;
    this.items = new Array(capacity);
  }

  /**
   * Get the current size of the heap
   * @returns number of elements in the heap
   */
  size(): number {
    return this._size;
  }

  /**
   * Check if the heap is empty
   * @returns true if heap is empty
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Check if the heap is full
   * @returns true if heap is full
   */
  isFull(): boolean {
    return this._size === this.capacity;
  }

  /**
   * Get the left child index
   * @param index - parent index
   * @returns left child index
   */
  protected left(index: number): number {
    return 2 * index + 1;
  }

  /**
   * Get the right child index
   * @param index - parent index
   * @returns right child index
   */
  protected right(index: number): number {
    return 2 * index + 2;
  }

  /**
   * Get the parent index
   * @param index - child index
   * @returns parent index
   */
  protected parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Swap two elements in the heap
   * @param i - first index
   * @param j - second index
   */
  protected swap(i: number, j: number): void {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }

  /**
   * Abstract method to compare two elements
   * @param a - first element
   * @param b - second element
   * @returns true if a should be higher in the heap than b
   */
  protected abstract compare(a: T, b: T): boolean;

  /**
   * Heapify up from a given index
   * @param index - starting index
   */
  protected heapifyUp(index: number): void {
    if (index === 0) return;

    const parentIndex = this.parent(index);
    if (this.compare(this.items[index], this.items[parentIndex])) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  /**
   * Heapify down from a given index
   * @param index - starting index
   */
  protected heapifyDown(index: number): void {
    const leftIndex = this.left(index);
    const rightIndex = this.right(index);
    let targetIndex = index;

    if (
      leftIndex < this._size &&
      this.compare(this.items[leftIndex], this.items[targetIndex])
    ) {
      targetIndex = leftIndex;
    }

    if (
      rightIndex < this._size &&
      this.compare(this.items[rightIndex], this.items[targetIndex])
    ) {
      targetIndex = rightIndex;
    }

    if (targetIndex !== index) {
      this.swap(index, targetIndex);
      this.heapifyDown(targetIndex);
    }
  }

  /**
   * Insert an element into the heap
   * @param element - element to insert
   * @throws Error if heap is full
   */
  insert(element: T): void {
    if (this.isFull()) {
      throw new Error('Heap is full - cannot insert');
    }

    this.items[this._size] = element;
    this.heapifyUp(this._size);
    this._size++;
  }

  /**
   * Remove and return the root element
   * @returns the root element
   * @throws Error if heap is empty
   */
  extract(): T {
    if (this.isEmpty()) {
      throw new Error('Heap is empty - cannot extract');
    }

    const root = this.items[0];
    this.items[0] = this.items[this._size - 1];
    this._size--;

    if (!this.isEmpty()) {
      this.heapifyDown(0);
    }

    return root;
  }

  /**
   * Peek at the root element without removing it
   * @returns the root element or undefined if empty
   */
  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.items[0];
  }

  /**
   * Clear all elements from the heap
   */
  clear(): void {
    this._size = 0;
  }

  /**
   * Convert heap to array
   * @returns array representation of the heap
   */
  toArray(): T[] {
    return this.items.slice(0, this._size);
  }

  /**
   * Get string representation of the heap
   * @returns string representation
   */
  toString(): string {
    return `Heap(${this._size}): [${this.toArray().join(', ')}]`;
  }
}
