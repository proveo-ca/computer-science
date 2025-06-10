// https://www.geeksforgeeks.org/a-product-array-puzzle/

/**
 * Returns an array where each element is the product of all elements in the input array except itself.
 * @param {number[]} nums - The input array of integers
 * @return {number[]} - Array where answer[i] is the product of all elements except nums[i]
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n);

  let leftAcc = 1;
  for (let i = 0; i < n; ++i) {
    result[i] = leftAcc;
    leftAcc *= nums[i];
  }

  let rightAcc = 1;
  for (let i = n - 1; i >= 0; --i) {
    result[i] *= rightAcc;
    rightAcc *= nums[i];
  }

  return result;
}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const nums = [1, 2, 3, 4];
    const result = productExceptSelf(nums);

    const expected = [24, 12, 8, 6];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 1 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 2: Example with zero and negative numbers
  const test2 = () => {
    const nums = [-1, 1, 0, -3, 3];
    const result = productExceptSelf(nums);

    const expected = [0, 0, 9, 0, 0];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 2 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 3: Minimum array size
  const test3 = () => {
    const nums = [2, 3];
    const result = productExceptSelf(nums);

    const expected = [3, 2];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 3 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 4: Array with all ones
  const test4 = () => {
    const nums = [1, 1, 1, 1];
    const result = productExceptSelf(nums);

    const expected = [1, 1, 1, 1];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 4 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 5: Array with maximum and minimum values
  const test5 = () => {
    const nums = [-30, 30, 1];
    const result = productExceptSelf(nums);

    const expected = [30, -30, -900];
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 5 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Run all tests
  test1();
  test2();
  test3();
  test4();
  test5();

  console.log("All tests passed!");
}

// Uncomment to run tests
// runTests();
