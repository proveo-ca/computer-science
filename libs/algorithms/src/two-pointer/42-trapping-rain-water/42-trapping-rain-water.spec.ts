import { describe, test, expect } from "bun:test";
import { trap } from "./42-trapping-rain-water.ts";

describe("42. Trapping Rain Water", () => {
  test("Example from the problem statement", () => {
    const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    const result = trap(height);

    expect(result).toBe(6);
  });

  test("Another example from the problem statement", () => {
    const height = [4, 2, 0, 3, 2, 5];
    const result = trap(height);

    expect(result).toBe(9);
  });

  test("Empty array", () => {
    const height: number[] = [];
    const result = trap(height);

    expect(result).toBe(0);
  });

  test("Single element", () => {
    const height = [5];
    const result = trap(height);

    expect(result).toBe(0);
  });

  test("No water can be trapped (monotonic increasing)", () => {
    const height = [1, 2, 3, 4, 5];
    const result = trap(height);

    expect(result).toBe(0);
  });

  test("No water can be trapped (monotonic decreasing)", () => {
    const height = [5, 4, 3, 2, 1];
    const result = trap(height);

    expect(result).toBe(0);
  });

  test("All zeros", () => {
    const height = [0, 0, 0, 0];
    const result = trap(height);

    expect(result).toBe(0);
  });

  test("Maximum constraints edge case", () => {
    const height = [100000, 0, 100000];
    const result = trap(height);

    expect(result).toBe(100000);
  });
});
