import { consoleDiff } from '../../../utils/consoleDiff.js';

/**
 * Determines if s is a subsequence of t
 * @param {string} s - The subsequence string to check
 * @param {string} t - The target string to search in
 * @return {boolean} True if s is a subsequence of t, false otherwise
 */
function isSubsequence(s, t) {
  // https://www.geeksforgeeks.org/given-two-strings-find-first-string-subsequence-second/

}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const s = "abc";
    const t = "ahbgdc";
    const result = isSubsequence(s, t);

    const expected = true;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const s = "axc";
    const t = "ahbgdc";
    const result = isSubsequence(s, t);

    const expected = false;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Empty subsequence string
  const test3 = () => {
    const s = "";
    const t = "ahbgdc";
    const result = isSubsequence(s, t);

    const expected = true;
    console.assert(result === expected,
      `Test 3 Failed: Empty string should be subsequence of any string: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: Empty target string
  const test4 = () => {
    const s = "abc";
    const t = "";
    const result = isSubsequence(s, t);

    const expected = false;
    console.assert(result === expected,
      `Test 4 Failed: Non-empty string cannot be subsequence of empty string: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: Both strings empty
  const test5 = () => {
    const s = "";
    const t = "";
    const result = isSubsequence(s, t);

    const expected = true;
    console.assert(result === expected,
      `Test 5 Failed: Empty string should be subsequence of empty string: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: Identical strings
  const test6 = () => {
    const s = "abc";
    const t = "abc";
    const result = isSubsequence(s, t);

    const expected = true;
    console.assert(result === expected,
      `Test 6 Failed: String should be subsequence of itself: Expected ${expected}, got ${result}`);
  };

  // Test Case 7: Single character match
  const test7 = () => {
    const s = "b";
    const t = "abc";
    const result = isSubsequence(s, t);

    const expected = true;
    console.assert(result === expected,
      `Test 7 Failed: Single character subsequence: Expected ${expected}, got ${result}`);
  };

  // Test Case 8: Maximum constraints edge case
  const test8 = () => {
    const s = "a".repeat(100);
    const t = "a".repeat(10000);
    const result = isSubsequence(s, t);

    const expected = true;
    console.assert(result === expected,
      `Test 8 Failed: Maximum length edge case: Expected ${expected}, got ${result}`);
  };

  // Run all tests
  test1();
  test2();
  test3();
  test4();
  test5();
  test6();
  test7();
  test8();

  console.log('All tests passed!');
}

// Uncomment to run tests
// runTests();

export { isSubsequence, runTests };
