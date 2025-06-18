import { describe, test, expect } from "bun:test";
import { RandomizedSet } from "./380-insert-delete-getrandom.js";

describe("380. Insert Delete GetRandom O(1)", () => {
  test("Example from the problem description", () => {
    const randomizedSet = new RandomizedSet();

    let result = randomizedSet.insert(1);
    expect(result).toBe(true);

    result = randomizedSet.remove(2);
    expect(result).toBe(false);

    result = randomizedSet.insert(2);
    expect(result).toBe(true);

    // For getRandom, we can't assert exact value, but we can check it's either 1 or 2
    const random1 = randomizedSet.getRandom();
    expect([1, 2]).toContain(random1);

    result = randomizedSet.remove(1);
    expect(result).toBe(true);

    result = randomizedSet.insert(2);
    expect(result).toBe(false);

    const random2 = randomizedSet.getRandom();
    expect(random2).toBe(2);
  });

  test("Test with large number of elements", () => {
    const randomizedSet = new RandomizedSet();
    const elementsToInsert = 100;

    // Insert elements 0 to 99
    for (let i = 0; i < elementsToInsert; i++) {
      const result = randomizedSet.insert(i);
      expect(result).toBe(true);
    }

    // Try inserting duplicates
    for (let i = 0; i < elementsToInsert; i++) {
      const result = randomizedSet.insert(i);
      expect(result).toBe(false);
    }

    // Remove elements
    for (let i = 0; i < elementsToInsert; i += 2) {
      const result = randomizedSet.remove(i);
      expect(result).toBe(true);
    }

    // Check random distribution (basic check)
    const counts = new Array(elementsToInsert).fill(0);
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      const random = randomizedSet.getRandom();
      // Only odd numbers should remain
      expect(random % 2).toBe(1);

      if (random < elementsToInsert) {
        counts[random]++;
      }
    }

    // Check that we got a reasonable distribution of values
    for (let i = 1; i < elementsToInsert; i += 2) {
      expect(counts[i]).toBeGreaterThan(0);
    }
  });

  test("Edge case - removing non-existent elements", () => {
    const randomizedSet = new RandomizedSet();

    randomizedSet.insert(5);
    randomizedSet.insert(10);
    randomizedSet.insert(15);

    // Try removing elements that don't exist
    let result = randomizedSet.remove(1);
    expect(result).toBe(false);

    result = randomizedSet.remove(20);
    expect(result).toBe(false);

    // Remove all elements
    randomizedSet.remove(5);
    randomizedSet.remove(10);

    // Try removing an element that was already removed
    result = randomizedSet.remove(5);
    expect(result).toBe(false);

    // Only 15 should remain
    const random = randomizedSet.getRandom();
    expect(random).toBe(15);
  });

  test("Edge case - boundary values", () => {
    const randomizedSet = new RandomizedSet();

    // Test with minimum and maximum integer values
    const minVal = -Math.pow(2, 31);
    const maxVal = Math.pow(2, 31) - 1;

    let result = randomizedSet.insert(minVal);
    expect(result).toBe(true);

    result = randomizedSet.insert(maxVal);
    expect(result).toBe(true);

    result = randomizedSet.insert(0);
    expect(result).toBe(true);

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

    expect(foundMin).toBe(true);
    expect(foundMax).toBe(true);
    expect(foundZero).toBe(true);
  });

  test("Insert-remove-insert sequence", () => {
    const randomizedSet = new RandomizedSet();

    // Insert a value
    let result = randomizedSet.insert(42);
    expect(result).toBe(true);

    // Remove it
    result = randomizedSet.remove(42);
    expect(result).toBe(true);

    // Insert it again
    result = randomizedSet.insert(42);
    expect(result).toBe(true);

    // Insert other values
    randomizedSet.insert(7);
    randomizedSet.insert(13);

    // Remove and re-insert in sequence
    randomizedSet.remove(7);
    result = randomizedSet.insert(7);
    expect(result).toBe(true);

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

    expect(found42).toBe(true);
    expect(found7).toBe(true);
    expect(found13).toBe(true);
  });
});
