import { consoleDiff } from '../../../../utils/consoleDiff.js';

/**
 * Formats text with full justification
 * @param {string[]} words - Array of words to format
 * @param {number} maxWidth - Maximum width of each line
 * @return {string[]} Array of justified text lines
 */
function fullJustify(words, maxWidth) {
  // https://www.geeksforgeeks.org/text-justification/

}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const words = ["This", "is", "an", "example", "of", "text", "justification."];
    const maxWidth = 16;
    const result = fullJustify(words, maxWidth);

    const expected = [
      "This    is    an",
      "example  of text",
      "justification.  "
    ];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 1 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const words = ["What","must","be","acknowledgment","shall","be"];
    const maxWidth = 16;
    const result = fullJustify(words, maxWidth);

    const expected = [
      "What   must   be",
      "acknowledgment  ",
      "shall be        "
    ];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 2 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 3: Example from the problem statement
  const test3 = () => {
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
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 3 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 4: Single word
  const test4 = () => {
    const words = ["hello"];
    const maxWidth = 10;
    const result = fullJustify(words, maxWidth);

    const expected = ["hello     "];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 4 Failed: Single word should be left-justified: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 5: Single word that fills entire width
  const test5 = () => {
    const words = ["justification"];
    const maxWidth = 13;
    const result = fullJustify(words, maxWidth);

    const expected = ["justification"];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 5 Failed: Word that fills width exactly: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 6: Two words with minimum spacing
  const test6 = () => {
    const words = ["a", "b"];
    const maxWidth = 3;
    const result = fullJustify(words, maxWidth);

    const expected = ["a b"];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 6 Failed: Two words with minimum spacing: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 7: Maximum constraints edge case
  const test7 = () => {
    const words = ["a".repeat(20)];
    const maxWidth = 20;
    const result = fullJustify(words, maxWidth);

    const expected = ["a".repeat(20)];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 7 Failed: Maximum word length: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 8: Multiple single character words
  const test8 = () => {
    const words = ["a", "b", "c", "d", "e"];
    const maxWidth = 9;
    const result = fullJustify(words, maxWidth);

    const expected = ["a  b  c d", "e        "];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 8 Failed: Multiple single chars: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
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

export { fullJustify, runTests };
