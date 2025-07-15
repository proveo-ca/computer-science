import { describe, test, expect } from "bun:test";
import { strStr } from "./28-find-index-first-occurrence-in-a-string.ts";

describe("28. Find the Index of the First Occurrence in a String", () => {
  test("Example from the problem statement", () => {
    const haystack = "sadbutsad";
    const needle = "sad";
    const result = strStr(haystack, needle);

    expect(result).toBe(0);
  });

  test("Needle not found", () => {
    const haystack = "leetcode";
    const needle = "leeto";
    const result = strStr(haystack, needle);

    expect(result).toBe(-1);
  });

  test("Empty needle", () => {
    const haystack = "hello";
    const needle = "";
    const result = strStr(haystack, needle);

    expect(result).toBe(0);
  });

  test("Needle longer than haystack", () => {
    const haystack = "a";
    const needle = "aa";
    const result = strStr(haystack, needle);

    expect(result).toBe(-1);
  });

  test("Needle at the end", () => {
    const haystack = "hello world";
    const needle = "world";
    const result = strStr(haystack, needle);

    expect(result).toBe(6);
  });
});
