/**
 * Determine if you can reach the last index of the array
 * @param {number[]} nums - Array where each element represents the maximum jump length
 * @return {boolean} True if you can reach the last index, false otherwise
 */
function canJump(nums) {
  let target = 0;
  for (let i = 0; i <= target; ++i)
  {
    target = Math.max(target, i + nums[i])
    if (target >= nums.length - 1) return true
  }
  return false
}

// Unit Tests
function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const nums = [2, 3, 1, 1, 4];
    const result = canJump(nums);

    const expected = true;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Example from the problem statement - cannot reach end
  const test2 = () => {
    const nums = [3, 2, 1, 0, 4];
    const result = canJump(nums);

    const expected = false;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Boundary - Single element array
  const test3 = () => {
    const nums = [1];
    const result = canJump(nums);

    const expected = true;
    console.assert(result === expected,
      `Test 3 Failed: Single element array should return ${expected}, got ${result}`);
  };

  // Test Case 4: Boundary - Array with all zeros except first element
  const test4 = () => {
    const nums = [1, 0, 0, 0, 0];
    const result = canJump(nums);

    const expected = false;
    console.assert(result === expected,
      `Test 4 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: Boundary - Array with large jumps
  const test5 = () => {
    const nums = [5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0];
    const result = canJump(nums);

    const expected = true;
    console.assert(result === expected,
      `Test 5 Failed: Expected ${expected}, got ${result}`);
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
