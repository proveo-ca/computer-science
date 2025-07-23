import { consoleDiff } from '../../utils/consoleDiff.js';

/**
 * Reverses the order of words in a string
 * @param {string} s - Input string containing words separated by spaces
 * @return {string} String with words in reverse order, single space separated
 */
function reverseWords(s) {
  // https://www.geeksforgeeks.org/reverse-words-in-a-given-string/
  // 0. Build buffer once – treated as our mutable "char array"
  const buf = Buffer.from(s, 'ascii');     // 1 byte per char under constraints

  /* ---------- ① collapse spaces ---------- */
  let write = 0, read = 0;
  // skip leading spaces
  while (read < buf.length && buf[read] === 0x20) read++;

  while (read < buf.length) {
    // copy non-space run
    while (read < buf.length && buf[read] !== 0x20)
      buf[write++] = buf[read++];
    // skip space run but leave exactly one space if more chars follow
    while (read < buf.length && buf[read] === 0x20) read++;
    if (read < buf.length) buf[write++] = 0x20;   // single separator
  }
  const n = write;        // effective "clean" length

  /* utility: in-place reverse of a slice [l, r] */
  const rev = (l, r) => {
    while (l < r) {
      const tmp = buf[l];
      buf[l++] = buf[r];
      buf[r--] = tmp;
    }
  };

  /* ---------- ② reverse whole buffer ---------- */
  rev(0, n - 1);

  /* ---------- ③ reverse each word ---------- */
  let start = 0;
  for (let i = 0; i <= n; ++i) {
    if (i === n || buf[i] === 0x20) {      // word boundary
      rev(start, i - 1);
      start = i + 1;
    }
  }

  /* ---------- result ---------- */
  return buf.toString('ascii', 0, n);
}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const s = "the sky is blue";
    const result = reverseWords(s);

    const expected = "blue is sky the";
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const s = "  hello world  ";
    const result = reverseWords(s);

    const expected = "world hello";
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Example from the problem statement
  const test3 = () => {
    const s = "a good   example";
    const result = reverseWords(s);

    const expected = "example good a";
    console.assert(result === expected,
      `Test 3 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: Single word
  const test4 = () => {
    const s = "hello";
    const result = reverseWords(s);

    const expected = "hello";
    console.assert(result === expected,
      `Test 4 Failed: Single word should return itself: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: Single word with leading/trailing spaces
  const test5 = () => {
    const s = "   hello   ";
    const result = reverseWords(s);

    const expected = "hello";
    console.assert(result === expected,
      `Test 5 Failed: Single word with spaces: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: Two words with multiple spaces
  const test6 = () => {
    const s = "  word1     word2  ";
    const result = reverseWords(s);

    const expected = "word2 word1";
    console.assert(result === expected,
      `Test 6 Failed: Two words with multiple spaces: Expected ${expected}, got ${result}`);
  };

  // Test Case 7: Maximum length edge case
  const test7 = () => {
    const s = "a".repeat(5000) + " " + "b".repeat(5000);
    const result = reverseWords(s);

    const expected = "b".repeat(5000) + " " + "a".repeat(5000);
    console.assert(result === expected,
      `Test 7 Failed: Maximum length edge case: Expected correct reversal`);
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

export { reverseWords, runTests };
