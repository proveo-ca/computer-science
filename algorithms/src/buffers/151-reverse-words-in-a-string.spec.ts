import { describe, test, expect } from "bun:test";
import { reverseWords } from "./151-reverse-words-in-a-string.js";

describe("151. Reverse Words in a String", () => {
  test("Example from the problem statement", () => {
    const s = "the sky is blue";
    const result = reverseWords(s);

    const expected = "blue is sky the";
    expect(result).toBe(expected);
  });

  test("Example with leading and trailing spaces", () => {
    const s = "  hello world  ";
    const result = reverseWords(s);

    const expected = "world hello";
    expect(result).toBe(expected);
  });

  test("Example with multiple spaces", () => {
    const s = "a good   example";
    const result = reverseWords(s);

    const expected = "example good a";
    expect(result).toBe(expected);
  });

  test("Single word", () => {
    const s = "hello";
    const result = reverseWords(s);

    const expected = "hello";
    expect(result).toBe(expected);
  });

  test("Single word with leading/trailing spaces", () => {
    const s = "   hello   ";
    const result = reverseWords(s);

    const expected = "hello";
    expect(result).toBe(expected);
  });

  test("Two words with multiple spaces", () => {
    const s = "  word1     word2  ";
    const result = reverseWords(s);

    const expected = "word2 word1";
    expect(result).toBe(expected);
  });

  test("Maximum length edge case", () => {
    const s = "a".repeat(5000) + " " + "b".repeat(5000);
    const result = reverseWords(s);

    const expected = "b".repeat(5000) + " " + "a".repeat(5000);
    expect(result).toBe(expected);
  });
});
