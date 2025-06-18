import { describe, test, expect } from "bun:test";
import { majorityElement } from "./169-majority-element.js";

describe("169. Majority Element", () => {
  test("Example from the problem statement", () => {
    const nums = [3, 2, 3];
    const result = majorityElement(nums);

    expect(result).toBe(3);
  });

  test("Another example from the problem statement", () => {
    const nums = [2, 2, 1, 1, 1, 2, 2];
    const result = majorityElement(nums);

    expect(result).toBe(2);
  });

  test("Single element array", () => {
    const nums = [5];
    const result = majorityElement(nums);

    expect(result).toBe(5);
  });

  test("Array with all identical elements", () => {
    const nums = [7, 7, 7, 7, 7];
    const result = majorityElement(nums);

    expect(result).toBe(7);
  });

  test("Array with negative numbers", () => {
    const nums = [-1, -1, -1, 2, 2];
    const result = majorityElement(nums);

    expect(result).toBe(-1);
  });
});
