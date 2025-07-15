import { describe, test, expect } from "bun:test";
import { longestCommonPrefix } from "./14-longest-common-prefix.ts";

describe("14. Longest Common Prefix", () => {
  test("Example from the problem statement", () => {
    const strs = ["flower", "flow", "flight"];
    const result = longestCommonPrefix(strs);

    expect(result).toBe("fl");
  });

  test("No common prefix", () => {
    const strs = ["dog", "racecar", "car"];
    const result = longestCommonPrefix(strs);

    expect(result).toBe("");
  });

  test("Single string", () => {
    const strs = ["hello"];
    const result = longestCommonPrefix(strs);

    expect(result).toBe("hello");
  });

  test("Empty string in array", () => {
    const strs = ["abc", "", "ab"];
    const result = longestCommonPrefix(strs);

    expect(result).toBe("");
  });

  test("All strings identical", () => {
    const strs = ["test", "test", "test"];
    const result = longestCommonPrefix(strs);

    expect(result).toBe("test");
  });

  test("No common prefix at all", () => {
    const strs = ["abc", "def", "ghi"];
    const result = longestCommonPrefix(strs);

    expect(result).toBe("");
  });

  test("Maximum constraints edge case", () => {
    const strs = ["a".repeat(200), "a".repeat(100) + "b".repeat(100)];
    const result = longestCommonPrefix(strs);

    expect(result).toBe("a".repeat(100));
  });
});
