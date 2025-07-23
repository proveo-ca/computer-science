import { describe, test, expect } from "bun:test";
import { intToRoman } from "./12-integer-to-roman";

describe("12. Integer to Roman", () => {
  test("Example from the problem statement - 3749", () => {
    const num = 3749;
    const result = intToRoman(num);

    expect(result).toBe("MMMDCCXLIX");
  });

  test("Example from the problem statement - 58", () => {
    const num = 58;
    const result = intToRoman(num);

    expect(result).toBe("LVIII");
  });

  test("Example from the problem statement - 1994", () => {
    const num = 1994;
    const result = intToRoman(num);

    expect(result).toBe("MCMXCIV");
  });

  test("Minimum value", () => {
    const num = 1;
    const result = intToRoman(num);

    expect(result).toBe("I");
  });

  test("Maximum value", () => {
    const num = 3999;
    const result = intToRoman(num);

    expect(result).toBe("MMMCMXCIX");
  });

  test("All subtractive forms", () => {
    const num = 444;
    const result = intToRoman(num);

    expect(result).toBe("CDXLIV"); // CD(400) + XL(40) + IV(4)
  });

  test("Simple powers of 10", () => {
    const num = 1111;
    const result = intToRoman(num);

    expect(result).toBe("MCXI"); // M(1000) + C(100) + X(10) + I(1)
  });
});
