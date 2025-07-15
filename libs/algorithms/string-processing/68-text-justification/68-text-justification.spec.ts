import { describe, test, expect } from "bun:test";
import { fullJustify } from "./68-text-justification.ts";

describe("68. Text Justification", () => {
  test("Example from the problem statement", () => {
    const words = ["This", "is", "an", "example", "of", "text", "justification."];
    const maxWidth = 16;
    const result = fullJustify(words, maxWidth);

    const expected = [
      "This    is    an",
      "example  of text",
      "justification.  "
    ];
    expect(result).toEqual(expected);
  });

  test("Another example from the problem statement", () => {
    const words = ["What","must","be","acknowledgment","shall","be"];
    const maxWidth = 16;
    const result = fullJustify(words, maxWidth);

    const expected = [
      "What   must   be",
      "acknowledgment  ",
      "shall be        "
    ];
    expect(result).toEqual(expected);
  });

  test("Science example from the problem statement", () => {
    const words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"];
    const maxWidth = 20;
    const result = fullJustify(words, maxWidth);

    const expected = [
      "Science  is  what we",
      "understand      well",
      "enough to explain to",
      "a  computer.  Art is",
      "everything  else  we",
      "do                  "
    ];
    expect(result).toEqual(expected);
  });

  test("Single word", () => {
    const words = ["hello"];
    const maxWidth = 10;
    const result = fullJustify(words, maxWidth);

    expect(result).toEqual(["hello     "]);
  });

  test("Single word that fills entire width", () => {
    const words = ["justification"];
    const maxWidth = 13;
    const result = fullJustify(words, maxWidth);

    expect(result).toEqual(["justification"]);
  });

  test("Two words with minimum spacing", () => {
    const words = ["a", "b"];
    const maxWidth = 3;
    const result = fullJustify(words, maxWidth);

    expect(result).toEqual(["a b"]);
  });

  test("Maximum constraints edge case", () => {
    const words = ["a".repeat(20)];
    const maxWidth = 20;
    const result = fullJustify(words, maxWidth);

    expect(result).toEqual(["a".repeat(20)]);
  });

  test("Multiple single character words", () => {
    const words = ["a", "b", "c", "d", "e"];
    const maxWidth = 9;
    const result = fullJustify(words, maxWidth);

    expect(result).toEqual(["a  b  c d", "e        "]);
  });
});
