
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

/**
 * Run all test cases for the RandomizedSet class
 */
function runTests() {
  // Test Case 1: Example from the problem description
  const test1 = () => {
    const randomizedSet = new RandomizedSet();

    let result = randomizedSet.insert(1);
    console.assert(result === true,
      `Test 1.1 Failed: Expected true for insert(1), got ${result}`);

    result = randomizedSet.remove(2);
    console.assert(result === false,
      `Test 1.2 Failed: Expected false for remove(2), got ${result}`);

    result = randomizedSet.insert(2);
    console.assert(result === true,
      `Test 1.3 Failed: Expected true for insert(2), got ${result}`);

    // For getRandom, we can't assert exact value, but we can check it's either 1 or 2
    const random1 = randomizedSet.getRandom();
    console.assert(random1 === 1 || random1 === 2,
      `Test 1.4 Failed: Expected getRandom() to return 1 or 2, got ${random1}`);

    result = randomizedSet.remove(1);
    console.assert(result === true,
      `Test 1.5 Failed: Expected true for remove(1), got ${result}`);

    result = randomizedSet.insert(2);
    console.assert(result === false,
      `Test 1.6 Failed: Expected false for insert(2), got ${result}`);

    const random2 = randomizedSet.getRandom();
    console.assert(random2 === 2,
      `Test 1.7 Failed: Expected getRandom() to return 2, got ${random2}`);
  };

  // Test Case 2: Test with large number of elements
  const test2 = () => {
    const randomizedSet = new RandomizedSet();
    const elementsToInsert = 100;

    // Insert elements 0 to 99
    for (let i = 0; i < elementsToInsert; i++) {
      const result = randomizedSet.insert(i);
      console.assert(result === true,
        `Test 2.1 Failed: Expected true for insert(${i}), got ${result}`);
    }

    // Try inserting duplicates
    for (let i = 0; i < elementsToInsert; i++) {
      const result = randomizedSet.insert(i);
      console.assert(result === false,
        `Test 2.2 Failed: Expected false for duplicate insert(${i}), got ${result}`);
    }

    // Remove elements
    for (let i = 0; i < elementsToInsert; i += 2) {
      const result = randomizedSet.remove(i);
      console.assert(result === true,
        `Test 2.3 Failed: Expected true for remove(${i}), got ${result}`);
    }

    // Check random distribution (basic check)
    const counts = new Array(elementsToInsert).fill(0);
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      const random = randomizedSet.getRandom();
      // Only odd numbers should remain
      console.assert(random % 2 === 1,
        `Test 2.4 Failed: Expected odd number from getRandom(), got ${random}`);

      if (random < elementsToInsert) {
        counts[random]++;
      }
    }

    // Check that we got a reasonable distribution of values
    // (this is a very basic statistical check)
    for (let i = 1; i < elementsToInsert; i += 2) {
      console.assert(counts[i] > 0,
        `Test 2.5 Failed: Expected random distribution to include ${i}, but it was never returned`);
    }
  };

  // Test Case 3: Edge case - removing non-existent elements
  const test3 = () => {
    const randomizedSet = new RandomizedSet();

    randomizedSet.insert(5);
    randomizedSet.insert(10);
    randomizedSet.insert(15);

    // Try removing elements that don't exist
    let result = randomizedSet.remove(1);
    console.assert(result === false,
      `Test 3.1 Failed: Expected false for remove(1), got ${result}`);

    result = randomizedSet.remove(20);
    console.assert(result === false,
      `Test 3.2 Failed: Expected false for remove(20), got ${result}`);

    // Remove all elements
    randomizedSet.remove(5);
    randomizedSet.remove(10);

    // Try removing an element that was already removed
    result = randomizedSet.remove(5);
    console.assert(result === false,
      `Test 3.3 Failed: Expected false for removing already removed element, got ${result}`);

    // Only 15 should remain
    const random = randomizedSet.getRandom();
    console.assert(random === 15,
      `Test 3.4 Failed: Expected getRandom() to return 15, got ${random}`);
  };

  // Test Case 4: Edge case - boundary values
  const test4 = () => {
    const randomizedSet = new RandomizedSet();

    // Test with minimum and maximum integer values
    const minVal = -Math.pow(2, 31);
    const maxVal = Math.pow(2, 31) - 1;

    let result = randomizedSet.insert(minVal);
    console.assert(result === true,
      `Test 4.1 Failed: Expected true for insert(${minVal}), got ${result}`);

    result = randomizedSet.insert(maxVal);
    console.assert(result === true,
      `Test 4.2 Failed: Expected true for insert(${maxVal}), got ${result}`);

    result = randomizedSet.insert(0);
    console.assert(result === true,
      `Test 4.3 Failed: Expected true for insert(0), got ${result}`);

    // Check that all values can be retrieved
    let foundMin = false;
    let foundMax = false;
    let foundZero = false;

    // Run getRandom multiple times to ensure we have a chance to get all values
    for (let i = 0; i < 100; i++) {
      const random = randomizedSet.getRandom();
      if (random === minVal) foundMin = true;
      if (random === maxVal) foundMax = true;
      if (random === 0) foundZero = true;
    }

    console.assert(foundMin,
      `Test 4.4 Failed: Expected to get minimum value (${minVal}) from getRandom()`);
    console.assert(foundMax,
      `Test 4.5 Failed: Expected to get maximum value (${maxVal}) from getRandom()`);
    console.assert(foundZero,
      `Test 4.6 Failed: Expected to get 0 from getRandom()`);
  };

  // Test Case 5: Test insert-remove-insert sequence
  const test5 = () => {
    const randomizedSet = new RandomizedSet();

    // Insert a value
    let result = randomizedSet.insert(42);
    console.assert(result === true,
      `Test 5.1 Failed: Expected true for insert(42), got ${result}`);

    // Remove it
    result = randomizedSet.remove(42);
    console.assert(result === true,
      `Test 5.2 Failed: Expected true for remove(42), got ${result}`);

    // Insert it again
    result = randomizedSet.insert(42);
    console.assert(result === true,
      `Test 5.3 Failed: Expected true for re-insert(42), got ${result}`);

    // Insert other values
    randomizedSet.insert(7);
    randomizedSet.insert(13);

    // Remove and re-insert in sequence
    randomizedSet.remove(7);
    result = randomizedSet.insert(7);
    console.assert(result === true,
      `Test 5.4 Failed: Expected true for re-insert(7), got ${result}`);

    // Check that all values are accessible via getRandom
    let found42 = false;
    let found7 = false;
    let found13 = false;

    for (let i = 0; i < 100; i++) {
      const random = randomizedSet.getRandom();
      if (random === 42) found42 = true;
      if (random === 7) found7 = true;
      if (random === 13) found13 = true;
    }

    console.assert(found42,
      `Test 5.5 Failed: Expected to get 42 from getRandom()`);
    console.assert(found7,
      `Test 5.6 Failed: Expected to get 7 from getRandom()`);
    console.assert(found13,
      `Test 5.7 Failed: Expected to get 13 from getRandom()`);
  };

  // Run all tests
  test1();
  test2();
  test3();
  test4();
  test5();

  console.log("All tests completed!");
}

// Execute tests
runTests();

export { RandomizedSet };
