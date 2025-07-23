import { describe, test, expect } from "bun:test";
import { rotate } from "./189-rotate-array";

describe("189. Rotate Array", () => {
  test("Example from the problem statement", () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;
    rotate(nums, k);

    expect(nums).toBe([5, 6, 7, 1, 2, 3, 4]);
  });

  test("Another example from the problem statement", () => {
    const nums = [-1, -100, 3, 99];
    const k = 2;
    rotate(nums, k);

    expect(nums).toBe([3, 99, -1, -100]);
  });

  test("k is 0 (no rotation)", () => {
    const nums = [1, 2, 3, 4, 5];
    const k = 0;
    rotate(nums, k);

    expect(nums).toBe([1, 2, 3, 4, 5]);
  });

  test("k is greater than array length", () => {
    const nums = [1, 2, 3, 4];
    const k = 6; // Equivalent to rotating by 2 (6 % 4 = 2)
    rotate(nums, k);

    expect(nums).toBe([3, 4, 1, 2]);
  });

  test("Single element array", () => {
    const nums = [42];
    const k = 5;
    rotate(nums, k);

    expect(nums).toBe([42]);
  });
});
