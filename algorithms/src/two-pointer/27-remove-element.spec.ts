import { describe, test, expect } from "bun:test";
import { removeElement } from "./27-remove-element.ts";

describe("27. Remove Element", () => {
  test("Simple example from the problem statement", () => {
    const nums = [3, 2, 2, 3];
    const val = 3;
    const k = removeElement(nums, val);

    expect(k).toBe(2);
    // Sort the first k elements to match the judge's verification
    const result = nums.slice(0, k).sort((a, b) => a - b);
    expect(result).toEqual([2, 2]);
  });

  test("Another example from the problem statement", () => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2];
    const val = 2;
    const k = removeElement(nums, val);

    expect(k).toBe(5);
    const result = nums.slice(0, k).sort((a, b) => a - b);
    expect(result).toEqual([0, 0, 1, 3, 4]);
  });

  test("Empty array", () => {
    const nums: number[] = [];
    const val = 5;
    const k = removeElement(nums, val);

    expect(k).toBe(0);
  });

  test("All elements are the value to remove", () => {
    const nums = [5, 5, 5, 5, 5];
    const val = 5;
    const k = removeElement(nums, val);

    expect(k).toBe(0);
  });

  test("No elements are the value to remove", () => {
    const nums = [1, 2, 3, 4, 5];
    const val = 0;
    const k = removeElement(nums, val);

    expect(k).toBe(5);
    const result = nums.slice(0, k).sort((a, b) => a - b);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
