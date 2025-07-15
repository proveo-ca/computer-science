/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function findNeedle(haystack, needle) {
  return haystack.search(needle)
}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const haystack = "sadbutsad"
    const needle = "sad"
    const result = findNeedle(haystack, needle)

    const expected = 0;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const haystack = ["leetcode"];
    const needle = "leeto"
    const result = findNeedle(haystack, needle);

    const expected = -1
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };
  // Run all tests
  test1();
  test2();

  console.log('All tests passed!');
}

// Uncomment to run tests
runTests();

export { findNeedle, runTests };
