import { consoleDiff } from '../../../utils/consoleDiff.js';

/**
 * Finds the longest common prefix string amongst an array of strings
 * @param {string[]} strs - Array of strings
 * @return {string} Longest common prefix string
 */
function longestCommonPrefix(strs) {
  // https://www.geeksforgeeks.org/longest-common-prefix-using-character-by-character-matching/
  if (strs.length === 0) return "";

  // Make a read index on first word
  for (let readIndex = 0; readIndex < strs[0].length; readIndex++) {
    const currentChar = strs[0][readIndex]

    // Read each word per read index
    for (const str of strs) {
      if (str[readIndex] !== currentChar) {
        // Return substring result on mismatch
        return str.slice(0, readIndex)
      }
    }
  }
  // This will run only when all words are the same
  return strs[0]
}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const strs = ["flower", "flow", "flight"];
    const result = longestCommonPrefix(strs);

    const expected = "fl";
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const strs = ["dog", "racecar", "car"];
    const result = longestCommonPrefix(strs);

    const expected = "";
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Single string
  const test3 = () => {
    const strs = ["hello"];
    const result = longestCommonPrefix(strs);

    const expected = "hello";
    console.assert(result === expected,
      `Test 3 Failed: Single string should return itself: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: Empty string in array
  const test4 = () => {
    const strs = ["abc", "", "ab"];
    const result = longestCommonPrefix(strs);

    const expected = "";
    console.assert(result === expected,
      `Test 4 Failed: Empty string should result in empty prefix: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: All strings identical
  const test5 = () => {
    const strs = ["test", "test", "test"];
    const result = longestCommonPrefix(strs);

    const expected = "test";
    console.assert(result === expected,
      `Test 5 Failed: All identical strings: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: No common prefix at all
  const test6 = () => {
    const strs = ["abc", "def", "ghi"];
    const result = longestCommonPrefix(strs);

    const expected = "";
    console.assert(result === expected,
      `Test 6 Failed: No common prefix: Expected ${expected}, got ${result}`);
  };

  // Test Case 7: Maximum constraints edge case
  const test7 = () => {
    const strs = ["a".repeat(200), "a".repeat(100) + "b".repeat(100)];
    const result = longestCommonPrefix(strs);

    const expected = "a".repeat(100);
    console.assert(result === expected,
      `Test 7 Failed: Maximum length edge case: Expected ${expected.length} chars, got ${result.length} chars`);
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
runTests();

export { longestCommonPrefix, runTests };
