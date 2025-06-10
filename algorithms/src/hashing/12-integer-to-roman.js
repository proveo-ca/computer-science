import { consoleDiff } from '../../../utils/consoleDiff.js';

/**
 * Converts an integer to a Roman numeral
 * @param {number} num - Integer to convert (1 <= num <= 3999)
 * @return {string} Roman numeral representation
 */
function intToRoman(num) {
  // https://www.geeksforgeeks.org/converting-decimal-number-lying-between-1-to-3999-to-roman-numerals/

}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const num = 3749;
    const result = intToRoman(num);

    const expected = "MMMDCCXLIX";
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const num = 58;
    const result = intToRoman(num);

    const expected = "LVIII";
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Example from the problem statement
  const test3 = () => {
    const num = 1994;
    const result = intToRoman(num);

    const expected = "MCMXCIV";
    console.assert(result === expected,
      `Test 3 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: Minimum value
  const test4 = () => {
    const num = 1;
    const result = intToRoman(num);

    const expected = "I";
    console.assert(result === expected,
      `Test 4 Failed: Minimum value: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: Maximum value
  const test5 = () => {
    const num = 3999;
    const result = intToRoman(num);

    const expected = "MMMCMXCIX";
    console.assert(result === expected,
      `Test 5 Failed: Maximum value: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: All subtractive forms
  const test6 = () => {
    const num = 444;
    const result = intToRoman(num);

    const expected = "CDXLIV"; // CD(400) + XL(40) + IV(4)
    console.assert(result === expected,
      `Test 6 Failed: All subtractive forms: Expected ${expected}, got ${result}`);
  };

  // Test Case 7: Simple powers of 10
  const test7 = () => {
    const num = 1111;
    const result = intToRoman(num);

    const expected = "MCXI"; // M(1000) + C(100) + X(10) + I(1)
    console.assert(result === expected,
      `Test 7 Failed: Powers of 10: Expected ${expected}, got ${result}`);
  };

  // Run all tests
  test1();
  test2();
  test3();
  test4();
  test5();
  test6();
  test7();

  console.log('All tests passed!');
}

// Uncomment to run tests
// runTests();

export { intToRoman, runTests };
