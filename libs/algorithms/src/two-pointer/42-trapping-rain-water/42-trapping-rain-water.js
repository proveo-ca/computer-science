import { consoleDiff } from '../../../../utils/consoleDiff.js';

/**
 * Calculates how much water can be trapped after raining
 * @param {number[]} height - Array of non-negative integers representing elevation map
 * @return {number} Amount of water that can be trapped
 */
function trap(height) {
  // https://www.geeksforgeeks.org/trapping-rain-water/

}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    const result = trap(height);

    const expected = 6;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const height = [4, 2, 0, 3, 2, 5];
    const result = trap(height);

    const expected = 9;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Empty array
  const test3 = () => {
    const height = [];
    const result = trap(height);

    const expected = 0;
    console.assert(result === expected,
      `Test 3 Failed: Empty array should trap 0 water: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: Single element
  const test4 = () => {
    const height = [5];
    const result = trap(height);

    const expected = 0;
    console.assert(result === expected,
      `Test 4 Failed: Single element should trap 0 water: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: No water can be trapped (monotonic increasing)
  const test5 = () => {
    const height = [1, 2, 3, 4, 5];
    const result = trap(height);

    const expected = 0;
    console.assert(result === expected,
      `Test 5 Failed: Monotonic increasing should trap 0 water: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: No water can be trapped (monotonic decreasing)
  const test6 = () => {
    const height = [5, 4, 3, 2, 1];
    const result = trap(height);

    const expected = 0;
    console.assert(result === expected,
      `Test 6 Failed: Monotonic decreasing should trap 0 water: Expected ${expected}, got ${result}`);
  };

  // Test Case 7: All zeros
  const test7 = () => {
    const height = [0, 0, 0, 0];
    const result = trap(height);

    const expected = 0;
    console.assert(result === expected,
      `Test 7 Failed: All zeros should trap 0 water: Expected ${expected}, got ${result}`);
  };

  // Test Case 8: Maximum constraints edge case
  const test8 = () => {
    const height = [100000, 0, 100000];
    const result = trap(height);

    const expected = 100000;
    console.assert(result === expected,
      `Test 8 Failed: Maximum values edge case: Expected ${expected}, got ${result}`);
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

export { trap, runTests };
