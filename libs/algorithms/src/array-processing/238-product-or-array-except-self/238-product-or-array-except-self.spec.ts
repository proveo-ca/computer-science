import { describe, test, expect } from "bun:test";
import { productExceptSelf } from "./238-product-or-array-except-self";

describe("238. Product of Array Except Self", () => {
  test("Example from the problem statement", () => {
    const nums = [1, 2, 3, 4];
    const result = productExceptSelf(nums);

    const expected = [24, 12, 8, 6];
    expect(result).toEqual(expected);
  });

  test("Example with zero and negative numbers", () => {
    const nums = [-1, 1, 0, -3, 3];
    const result = productExceptSelf(nums);

    const expected = [0, 0, 9, 0, 0];
    expect(result).toEqual(expected);
  });

  test("Minimum array size", () => {
    const nums = [2, 3];
    const result = productExceptSelf(nums);

    const expected = [3, 2];
    expect(result).toEqual(expected);
  });

  test("Array with all ones", () => {
    const nums = [1, 1, 1, 1];
    const result = productExceptSelf(nums);

    const expected = [1, 1, 1, 1];
    expect(result).toEqual(expected);
  });

  test("Array with maximum and minimum values", () => {
    const nums = [-30, 30, 1];
    const result = productExceptSelf(nums);

    const expected = [30, -30, -900];
    expect(result).toEqual(expected);
  });
});
