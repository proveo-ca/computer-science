// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/

/**
 * Find the majority element in an array
 * @param {number[]} nums - The input array
 * @return {number} The majority element
 */
function majorityElement(nums) {
  let candidate = -1;
  let count = 0;

  for (const x of nums) {
    if (count === 0) {
      candidate = x;
      count = 1;
    } else if (x === candidate) {
      count++;
    } else {
      count--;
    }
  }
  return candidate;
}

// Unit Tests
function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const nums = [3, 2, 3];
    const result = majorityElement(nums);

    const expected = 3;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Another example from the problem statement
  const test2 = () => {
    const nums = [2, 2, 1, 1, 1, 2, 2];
    const result = majorityElement(nums);

    const expected = 2;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Boundary - Array with single element
  const test3 = () => {
    const nums = [5];
    const result = majorityElement(nums);

    const expected = 5;
    console.assert(result === expected,
      `Test 3 Failed: Single element array should return ${expected}, got ${result}`);
  };

  // Test Case 4: Boundary - Array with all identical elements
  const test4 = () => {
    const nums = [7, 7, 7, 7, 7];
    const result = majorityElement(nums);

    const expected = 7;
    console.assert(result === expected,
      `Test 4 Failed: Array with all identical elements should return ${expected}, got ${result}`);
  };

  // Test Case 5: Boundary - Array with negative numbers
  const test5 = () => {
    const nums = [-1, -1, -1, 2, 2];
    const result = majorityElement(nums);

    const expected = -1;
    console.assert(result === expected,
      `Test 5 Failed: Array with negative numbers should return ${expected}, got ${result}`);
  };

  // Run all tests
  test1();
  test2();
  test3();
  test4();
  test5();
  console.log("All tests completed");
}

// Uncomment to run tests
runTests();
