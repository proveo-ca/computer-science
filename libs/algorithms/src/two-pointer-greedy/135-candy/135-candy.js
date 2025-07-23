import { consoleDiff } from '../../../../utils/consoleDiff.js';

/**
 * Calculates the minimum number of candies needed to distribute to children
 * @param {number[]} ratings - Array of rating values for each child
 * @return {number} Minimum number of candies needed
 */
function candy(ratings) {
  // https://www.geeksforgeeks.org/minimum-number-of-candies-required-to-distribute-among-children-based-on-given-conditions/

}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const ratings = [1, 0, 2];
    const result = candy(ratings);

    const expected = 5;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement
  const test2 = () => {
    const ratings = [1, 2, 2];
    const result = candy(ratings);

    const expected = 4;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Single child
  const test3 = () => {
    const ratings = [5];
    const result = candy(ratings);

    const expected = 1;
    console.assert(result === expected,
      `Test 3 Failed: Single child should get 1 candy: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: All children have same rating
  const test4 = () => {
    const ratings = [3, 3, 3, 3];
    const result = candy(ratings);

    const expected = 4;
    console.assert(result === expected,
      `Test 4 Failed: All same ratings should get 1 candy each: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: Strictly increasing ratings
  const test5 = () => {
    const ratings = [1, 2, 3, 4, 5];
    const result = candy(ratings);

    const expected = 15; // 1 + 2 + 3 + 4 + 5
    console.assert(result === expected,
      `Test 5 Failed: Strictly increasing ratings: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: Strictly decreasing ratings
  const test6 = () => {
    const ratings = [5, 4, 3, 2, 1];
    const result = candy(ratings);

    const expected = 15; // 5 + 4 + 3 + 2 + 1
    console.assert(result === expected,
      `Test 6 Failed: Strictly decreasing ratings: Expected ${expected}, got ${result}`);
  };

  // Test Case 7: Maximum constraints edge case
  const test7 = () => {
    const ratings = [0, 20000, 0];
    const result = candy(ratings);

    const expected = 5; // 2 + 1 + 2
    console.assert(result === expected,
      `Test 7 Failed: Maximum values edge case: Expected ${expected}, got ${result}`);
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

export { candy, runTests };
