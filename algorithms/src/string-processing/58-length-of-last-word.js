import { consoleDiff } from '../../../utils/consoleDiff.js';

/**
 * Returns the length of the last word in a string
 * @param {string} s - String consisting of words and spaces
 * @return {number} Length of the last word
 */
function lengthOfLastWord(s) {
  // https://www.geeksforgeeks.org/find-length-of-the-last-word-in-a-string/

}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const s = "Hello World";
    const result = lengthOfLastWord(s);

    const expected = 5;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const s = "   fly me   to   the moon  ";
    const result = lengthOfLastWord(s);

    const expected = 4;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Example from the problem statement
  const test3 = () => {
    const s = "luffy is still joyboy";
    const result = lengthOfLastWord(s);

    const expected = 6;
    console.assert(result === expected,
      `Test 3 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: Single word
  const test4 = () => {
    const s = "hello";
    const result = lengthOfLastWord(s);

    const expected = 5;
    console.assert(result === expected,
      `Test 4 Failed: Single word: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: Single character
  const test5 = () => {
    const s = "a";
    const result = lengthOfLastWord(s);

    const expected = 1;
    console.assert(result === expected,
      `Test 5 Failed: Single character: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: Word with leading spaces only
  const test6 = () => {
    const s = "   word";
    const result = lengthOfLastWord(s);

    const expected = 4;
    console.assert(result === expected,
      `Test 6 Failed: Leading spaces only: Expected ${expected}, got ${result}`);
  };

  // Test Case 7: Maximum length constraint
  const test7 = () => {
    const s = "a".repeat(10000);
    const result = lengthOfLastWord(s);

    const expected = 10000;
    console.assert(result === expected,
      `Test 7 Failed: Maximum length: Expected ${expected}, got ${result}`);
  };

  // Test Case 8: Multiple spaces between words
  const test8 = () => {
    const s = "word1     word2";
    const result = lengthOfLastWord(s);

    const expected = 5;
    console.assert(result === expected,
      `Test 8 Failed: Multiple spaces: Expected ${expected}, got ${result}`);
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

export { lengthOfLastWord, runTests };
