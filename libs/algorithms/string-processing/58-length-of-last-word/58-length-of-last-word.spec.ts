import { describe, test, expect } from "bun:test";
import { lengthOfLastWord } from "./58-length-of-last-word.ts";

describe("58. Length of Last Word", () => {
  test("Example from the problem statement", () => {
    const s = "Hello World";
    const result = lengthOfLastWord(s);

    expect(result).toBe(5);
  });

  test("String with trailing spaces", () => {
    const s = "   fly me   to   the moon  ";
    const result = lengthOfLastWord(s);

    expect(result).toBe(4);
  });

  test("Multiple words", () => {
    const s = "luffy is still joyboy";
    const result = lengthOfLastWord(s);

    expect(result).toBe(6);
  });

  test("Single word", () => {
    const s = "hello";
    const result = lengthOfLastWord(s);

    expect(result).toBe(5);
  });

  test("Single character", () => {
    const s = "a";
    const result = lengthOfLastWord(s);

    expect(result).toBe(1);
  });

  test("Word with leading spaces only", () => {
    const s = "   word";
    const result = lengthOfLastWord(s);

    expect(result).toBe(4);
  });

  test("Maximum length constraint", () => {
    const s = "a".repeat(10000);
    const result = lengthOfLastWord(s);

    expect(result).toBe(10000);
  });

  test("Multiple spaces between words", () => {
    const s = "word1     word2";
    const result = lengthOfLastWord(s);

    expect(result).toBe(5);
  });
});
