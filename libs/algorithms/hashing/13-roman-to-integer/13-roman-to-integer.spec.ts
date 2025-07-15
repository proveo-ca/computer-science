import { describe, test, expect } from "bun:test";
import { romanToInt } from "./13-roman-to-integer";

describe("13. Roman to Integer", () => {
  test("Example from the problem statement - III", () => {
    const s = "III";
    const result = romanToInt(s);

    expect(result).toBe(3);
  });

  test("Example from the problem statement - LVIII", () => {
    const s = "LVIII";
    const result = romanToInt(s);

    expect(result).toBe(58);
  });

  test("Example from the problem statement - MCMXCIV", () => {
    const s = "MCMXCIV";
    const result = romanToInt(s);

    expect(result).toBe(1994);
  });

  test("Single character M", () => {
    const s = "M";
    const result = romanToInt(s);

    expect(result).toBe(1000);
  });

  test("All subtraction cases", () => {
    const s = "CDXLIV";
    const result = romanToInt(s);

    expect(result).toBe(444); // CD(400) + XL(40) + IV(4)
  });

  test("Maximum value", () => {
    const s = "MMMCMXCIX";
    const result = romanToInt(s);

    expect(result).toBe(3999);
  });

  test("Minimum value", () => {
    const s = "I";
    const result = romanToInt(s);

    expect(result).toBe(1);
  });
});
