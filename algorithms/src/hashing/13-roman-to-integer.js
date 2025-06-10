import { consoleDiff } from '../../../utils/consoleDiff.js';

/**
 * Converts a roman numeral to an integer
 * @param {string} s - Roman numeral string
 * @return {number} Integer value of the roman numeral
 */
function romanToInt(s) {
  // https://www.geeksforgeeks.org/converting-roman-numerals-decimal-lying-1-3999/

}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const s = "III";
    const result = romanToInt(s);

    const expected = 3;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const s = "LVIII";
    const result = romanToInt(s);

    const expected = 58;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Example from the problem statement
  const test3 = () => {
    const s = "MCMXCIV";
    const result = romanToInt(s);

    const expected = 1994;
    console.assert(result === expected,
      `Test 3 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: Single character
  const test4 = () => {
    const s = "M";
    const result = romanToInt(s);

    const expected = 1000;
    console.assert(result === expected,
      `Test 4 Failed: Single character M: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: All subtraction cases
  const test5 = () => {
    const s = "CDXLIV";
    const result = romanToInt(s);

    const expected = 444; // CD(400) + XL(40) + IV(4)
    console.assert(result === expected,
      `Test 5 Failed: All subtraction cases: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: Maximum value
  const test6 = () => {
    const s = "MMMCMXCIX";
    const result = romanToInt(s);

    const expected = 3999;
    console.assert(result === expected,
      `Test 6 Failed: Maximum value: Expected ${expected}, got ${result}`);
  };

  // Test Case 7: Minimum value
  const test7 = () => {
    const s = "I";
    const result = romanToInt(s);

    const expected = 1;
    console.assert(result === expected,
      `Test 7 Failed: Minimum value: Expected ${expected}, got ${result}`);
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

export { romanToInt, runTests };
