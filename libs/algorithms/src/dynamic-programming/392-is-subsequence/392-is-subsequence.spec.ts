import { describe, test, expect } from "bun:test";
import { isSubsequence } from "./392-is-subsequence";

describe("392. Is Subsequence", () => {
  test("Example from the problem statement - true case", () => {
    const s = "abc";
    const t = "ahbgdc";
    const result = isSubsequence(s, t);

    expect(result).toBe(true);
  });

  test("Example from the problem statement - false case", () => {
    const s = "axc";
    const t = "ahbgdc";
    const result = isSubsequence(s, t);

    expect(result).toBe(false);
  });

  test("Empty subsequence string", () => {
    const s = "";
    const t = "ahbgdc";
    const result = isSubsequence(s, t);

    expect(result).toBe(true);
  });

  test("Empty target string", () => {
    const s = "abc";
    const t = "";
    const result = isSubsequence(s, t);

    expect(result).toBe(false);
  });

  test("Both strings empty", () => {
    const s = "";
    const t = "";
    const result = isSubsequence(s, t);

    expect(result).toBe(true);
  });

  test("Identical strings", () => {
    const s = "abc";
    const t = "abc";
    const result = isSubsequence(s, t);

    expect(result).toBe(true);
  });

  test("Single character match", () => {
    const s = "b";
    const t = "abc";
    const result = isSubsequence(s, t);

    expect(result).toBe(true);
  });

  test("Maximum constraints edge case", () => {
    const s = "a".repeat(100);
    const t = "a".repeat(10000);
    const result = isSubsequence(s, t);

    expect(result).toBe(true);
  });
});
