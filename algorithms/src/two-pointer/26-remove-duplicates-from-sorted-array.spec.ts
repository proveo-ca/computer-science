import { describe, test, expect } from "bun:test";
import { removeDuplicates } from "./26-remove-duplicates-from-sorted-array.ts";

describe("26. Remove Duplicates from Sorted Array", () => {
  test("Simple example from the problem statement", () => {
    const nums = [1, 1, 2];
    const k = removeDuplicates(nums);

    expect(k).toBe(2);
    expect(nums.slice(0, k)).toEqual([1, 2]);
  });

  test("Another example from the problem statement", () => {
    const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    const k = removeDuplicates(nums);

    expect(k).toBe(5);
    expect(nums.slice(0, k)).toEqual([0, 1, 2, 3, 4]);
  });

  test("Single element array", () => {
    const nums = [5];
    const k = removeDuplicates(nums);

    expect(k).toBe(1);
    expect(nums.slice(0, k)).toEqual([5]);
  });

  test("Array with all identical elements", () => {
    const nums = [7, 7, 7, 7, 7];
    const k = removeDuplicates(nums);

    expect(k).toBe(1);
    expect(nums.slice(0, k)).toEqual([7]);
  });

  test("Array with negative numbers and duplicates", () => {
    const nums = [-10, -10, -5, -5, 0, 0, 5, 5, 10, 10];
    const k = removeDuplicates(nums);

    expect(k).toBe(5);
    expect(nums.slice(0, k)).toEqual([-10, -5, 0, 5, 10]);
  });
});
