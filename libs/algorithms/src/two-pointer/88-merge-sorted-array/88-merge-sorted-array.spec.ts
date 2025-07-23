import { describe, test, expect } from "bun:test";
import { merge } from "./88-merge-sorted-array.ts";

describe("88. Merge Sorted Array", () => {
  test("Simple example from the problem statement", () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const m = 3;
    const nums2 = [2, 5, 6];
    const n = 3;

    merge(nums1, m, nums2, n);
    expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
  });

  test("Empty nums2", () => {
    const nums1 = [1, 2, 3];
    const m = 3;
    const nums2: number[] = [];
    const n = 0;

    merge(nums1, m, nums2, n);
    expect(nums1).toEqual([1, 2, 3]);
  });

  test("Empty nums1", () => {
    const nums1 = [0, 0, 0];
    const m = 0;
    const nums2 = [1, 2, 3];
    const n = 3;

    merge(nums1, m, nums2, n);
    expect(nums1).toEqual([1, 2, 3]);
  });

  test("Maximum size arrays", () => {
    const nums1 = Array(400).fill(0);
    for (let i = 0; i < 200; i++) {
      nums1[i] = i * 2 + 2;
    }
    const m = 200;
    const nums2 = Array(200).fill(0).map((_, i) => i * 2 + 1);
    const n = 200;

    const expected = Array(400).fill(0).map((_, i) => i + 1);

    merge(nums1, m, nums2, n);
    expect(nums1).toEqual(expected);
  });

  test("Negative numbers", () => {
    const nums1 = [-10, -5, 2, 5, 0, 0, 0];
    const m = 4;
    const nums2 = [-8, -3, 10];
    const n = 3;

    merge(nums1, m, nums2, n);
    expect(nums1).toEqual([-10, -8, -5, -3, 2, 5, 10]);
  });
});
