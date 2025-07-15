import { consoleDiff } from '../../../utils/consoleDiff.js'

/**
 * Remove all occurrences of val from nums in-place
 * @param {number[]} nums - The array to modify
 * @param {number} val - The value to remove
 * @return {number} The number of elements in nums which are not equal to val
 */
function removeElement(nums, val) {
  let tmp
  let ri = nums.length - 1
  let li = 0
  let k = 0

  while (li <= ri) {
    if (Number.isInteger(nums[li]) && nums[li] !== val) {
      li++
      k++
    } else {
      while (nums[ri] === val && ri !== li) ri--

      tmp = nums[li]
      nums[li] = nums[ri]
      nums[ri] = tmp
      ri--
    }
  }

  return k
}

// Unit Tests
function runTests() {
  // Test Case 1: Simple example from the problem statement
  const test1 = () => {
    const nums = [3, 2, 2, 3];
    const val = 3;
    const k = removeElement(nums, val);

    const expected = 2;
    console.assert(k === expected,
      `Test 1 Failed: Expected k=${expected}, got k=${k}`);

    // Sort the first k elements to match the judge's verification
    nums.slice(0, k).sort((a, b) => a - b);
    console.assert(nums[0] === 2 && nums[1] === 2,
      `Test 1 Failed: First ${k} elements should be [2,2]`);
  };

  // Test Case 2: Another example from the problem statement
  const test2 = () => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2];
    const val = 2;
    const k = removeElement(nums, val);

    const expected = 5;
    console.assert(k === expected,
      `Test 2 Failed: Expected k=${expected}, got k=${k}`);

    // Sort the first k elements to match the judge's verification
    const sortedResult = nums.slice(0, k).sort((a, b) => a - b);
    const expectedResult = [0, 0, 1, 3, 4];
    console.assert(JSON.stringify(sortedResult) === JSON.stringify(expectedResult),
      `Test 2 Failed: Sorted first ${k} elements should be ${JSON.stringify(expectedResult)}, got ${JSON.stringify(sortedResult)}`);
  };

  // Test Case 3: Boundary - Empty array
  const test3 = () => {
    const nums = [];
    const val = 5;
    const k = removeElement(nums, val);

    const expected = 0;
    console.assert(k === expected,
      `Test 3 Failed: Empty array should return k=${expected}, got k=${k}`);
  };

  // Test Case 4: Boundary - All elements are the value to remove
  const test4 = () => {
    const nums = [5, 5, 5, 5, 5];
    const val = 5;
    const k = removeElement(nums, val);

    const expected = 0;
    console.assert(k === expected,
      `Test 4 Failed: When all elements are the value to remove, should return k=${expected}, got k=${k}`);
  };

  // Test Case 5: Boundary - No elements are the value to remove
  const test5 = () => {
    const nums = [1, 2, 3, 4, 5];
    const val = 0;
    const k = removeElement(nums, val);

    const expected = 5;
    console.assert(k === expected,
      `Test 5 Failed: When no elements are the value to remove, should return k=${expected}, got k=${k}`);

    const expectedResult = [1, 2, 3, 4, 5];
    console.assert(JSON.stringify(nums.slice(0, k).sort((a, b) => a - b)) === JSON.stringify(expectedResult),
      `Test 5 Failed: Array should remain unchanged`);
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
