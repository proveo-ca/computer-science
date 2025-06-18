import { describe, test, expect } from "bun:test";
import { hIndex } from "./274-h-index.ts";

describe("274. H-Index", () => {
  test("Example from the problem statement", () => {
    const citations = [3, 0, 6, 1, 5];
    const result = hIndex(citations);

    expect(result).toBe(3);
  });

  test("Second example from the problem statement", () => {
    const citations = [1, 3, 1];
    const result = hIndex(citations);

    expect(result).toBe(1);
  });

  test("All papers have the same number of citations", () => {
    const citations = [5, 5, 5, 5, 5];
    const result = hIndex(citations);

    expect(result).toBe(5);
  });

  test("No citations", () => {
    const citations = [0, 0, 0, 0, 0];
    const result = hIndex(citations);

    expect(result).toBe(0);
  });

  test("Single paper", () => {
    const citations = [100];
    const result = hIndex(citations);

    expect(result).toBe(1);
  });
});
