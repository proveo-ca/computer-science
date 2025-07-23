import { consoleDiff } from '../../../../utils/consoleDiff.js'

/**
 * Remove duplicates from a sorted array in-place
 * @param {number[]} nums - The sorted array to modify
 * @return {number} The number of unique elements in nums
 */
function removeDuplicates(nums) {
  let wi = 0
  let ri = Math.min(wi + 1, nums.length - 1)

  if (ri === -1) return 0

  let k = 1
  while (wi < ri) {
    if (Number.isInteger(nums[wi])
      && Number.isInteger(nums[ri])
      && nums[wi] < nums[ri]) {
        wi++
        ri++
        k++
    } else {
      while (nums[wi] >= nums[ri]) {
        ri++
      }

      if (ri === nums.length) return k
      k++
      wi++
      nums[wi] = nums[ri]
    }
  }
  return k
}

// Unit Tests
function runTests() {
  // Test Case 1: Simple example from the problem statement
  const test1 = () => {
    const nums = [1, 1, 2];
    const k = removeDuplicates(nums);

    const expected = 2;
    console.assert(k === expected,
      `Test 1 Failed: Expected k=${expected}, got k=${k}`);

    const expectedArray = [1, 2];
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 1 Failed: First ${expected} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
  };

  // Test Case 2: Another example from the problem statement
  const test2 = () => {
    const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    const k = removeDuplicates(nums);

    const expected = 5;
    console.assert(k === expected,
      `Test 2 Failed: Expected k=${expected}, got k=${k}`);

    const expectedArray = [0, 1, 2, 3, 4];
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 2 Failed: First ${expected} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
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
      `Test 3 Failed: First ${expected} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
  };

  // Test Case 4: Boundary - Array with all identical elements
  const test4 = () => {
    const nums = [7, 7, 7, 7, 7];
    const k = removeDuplicates(nums);

    const expected = 1;
    console.assert(k === expected,
      `Test 4 Failed: Array with all identical elements should return k=${expected}, got k=${k}`);

    const expectedArray = [7];
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 4 Failed: First ${expected} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
  };

  // Test Case 5: Boundary - Array with negative numbers and duplicates
  const test5 = () => {
    const nums = [-10, -10, -5, -5, 0, 0, 5, 5, 10, 10];
    const k = removeDuplicates(nums);

    const expected = 5;
    console.assert(k === expected,
      `Test 5 Failed: Array with negative numbers should return k=${expected}, got k=${k}`);

    const expectedArray = [-10, -5, 0, 5, 10];
    console.assert(JSON.stringify(nums.slice(0, k)) === JSON.stringify(expectedArray),
      `Test 5 Failed: First ${k} elements should be ${JSON.stringify(expectedArray)}, got ${JSON.stringify(nums.slice(0, k))}`);
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
