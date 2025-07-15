import { consoleDiff } from '../../../utils/consoleDiff.js'

/**
 * Remove duplicates from a sorted array in-place such that each element appears at most twice
 * @param {number[]} nums - The sorted array to modify
 * @return {number} The number of elements after removing duplicates
 */
function removeDuplicates(nums) {
  if (nums.length <= 2) return nums.length;

  let wi = 2;

  for (let ri = 2; ri < nums.length; ri++) {

    if (nums[ri] !== nums[wi - 2]) {
      nums[wi] = nums[ri];
      wi++;
    }
  }

  return wi;
}

// Unit Tests
function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const nums = [1, 1, 1, 2, 2, 3];
    const k = removeDuplicates(nums);

    const expected = 5;
    console.assert(k === expected,
      `Test 1 Failed: Expected k=${expected}, got k=${k}`);

    const expectedArray = [1, 1, 2, 2, 3];
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 1 Failed: First ${k} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
  };

  // Test Case 2: Another example from the problem statement
  const test2 = () => {
    const nums = [0, 0, 1, 1, 1, 1, 2, 3, 3];
    const k = removeDuplicates(nums);

    const expected = 7;
    console.assert(k === expected,
      `Test 2 Failed: Expected k=${expected}, got k=${k}`);

    const expectedArray = [0, 0, 1, 1, 2, 3, 3];
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 2 Failed: First ${k} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
  };

  // Test Case 3: Boundary - Array with single element
  const test3 = () => {
    const nums = [5];
    const k = removeDuplicates(nums);

    const expected = 1;
    console.assert(k === expected,
      `Test 3 Failed: Single element array should return k=${expected}, got k=${k}`);

    const expectedArray = [5];
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 3 Failed: First ${k} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
  };

  // Test Case 4: Boundary - Array with all identical elements
  const test4 = () => {
    const nums = [7, 7, 7, 7, 7];
    const k = removeDuplicates(nums);

    const expected = 2;
    console.assert(k === expected,
      `Test 4 Failed: Array with all identical elements should return k=${expected}, got k=${k}`);

    const expectedArray = [7, 7];
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 4 Failed: First ${k} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
  };

  // Test Case 5: Boundary - Array with negative numbers and duplicates
  const test5 = () => {
    const nums = [-10, -10, -10, -5, -5, 0, 0, 0, 5, 5, 5, 10, 10];
    const k = removeDuplicates(nums);

    const expected = 10;
    console.assert(k === expected,
      `Test 5 Failed: Array with negative numbers should return k=${expected}, got k=${k}`);

    const expectedArray = [-10, -10, -5, -5, 0, 0, 5, 5, 10, 10]
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 5 Failed: 
      First ${expected} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}
      ${consoleDiff(expectedArray, nums.slice(0, k))}
      `);
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
