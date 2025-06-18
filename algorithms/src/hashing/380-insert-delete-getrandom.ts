
/**
 * RandomizedSet class that supports insert, remove and getRandom operations in O(1) time
 *
 * // https://www.geeksforgeeks.org/design-a-data-structure-that-supports-insert-delete-search-and-getrandom-in-constant-time
 * // https://www.geeksforgeeks.org/select-a-random-number-from-stream-with-o1-space
 */
class RandomizedSet {
  constructor() {
    this.values = []
    this.state = new Map()
  }

  /**
   * Inserts an item val into the set if not present.
   * Returns true if the item was not present, false otherwise.
   * @param {number} val - The value to insert
   * @return {boolean}
   */
  insert(val) {
    if (this.state.has(val)) return false

    let index = this.values.length
    this.values.push(val)
    this.state.set(val, index)

    return true
  }

  /**
   * Removes an item val from the set if present.
   * Returns true if the item was present, false otherwise.
   * @param {number} val - The value to remove
   * @return {boolean}
   */
  remove(val) {
    if (!this.state.has(val)) return false

    let index = this.state.get(val)
    this.state.delete(val)

    // Swap the last index and pop, to avoid shifting
    if (index !== this.values.length - 1) {
      const lastIndex = this.values.length - 1
      this.values[index] = this.values[lastIndex]
      // sync state
      this.state.set(this.values[index], index)
    }
    this.values.pop()

    return true
  }

  /**
   * Returns a random element from the current set of elements.
   * Each element must have the same probability of being returned.
   * @return {number}
   */
  getRandom() {
    const index = Math.floor(Math.random() * this.values.length);

    return this.values[index]
  }
}

export { RandomizedSet };
