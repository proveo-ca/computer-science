import { consoleDiff } from '../../../../utils/consoleDiff.js'

/**
 * Merge two sorted arrays into the first array
 * @param {number[]} nums1 - The first array with space for the merged result
 * @param {number} m - The number of elements in nums1
 * @param {number[]} nums2 - The second array to merge
 * @param {number} n - The number of elements in nums2
 * @return {void} Do not return anything, modify nums1 in-place instead
 */
function shiftingMerge(nums1, m, nums2, n) {
  let li = 0
  let ri = m - 1
  nums1.forEach((c, i) => {
    if (!Number.isInteger(nums2[li])
      || (Number(c) < Number(nums2[li]) && c !== 0)
    ) {
      return;
    } else {
      console.log("SHIFTING VALUES RIGHT")
      for (let k = ri; k >= i; k--) {
        nums1[k + 1] = nums1[k]
      }
      nums1[i] = nums2[li]
      ri++
      li++
    }
  })
}

/**
 * Merge two sorted arrays into the first array
 * @param {number[]} nums1 - The first array with space for the merged result
 * @param {number} m - The number of elements in nums1
 * @param {number[]} nums2 - The second array to merge
 * @param {number} n - The number of elements in nums2
 * @return {void} Do not return anything, modify nums1 in-place instead
 */
function merge(nums1, m, nums2, n) {
  let lmi = m - 1
  let lni = n - 1
  let wi = m + n - 1

  while (lni >= 0) {
    if (lmi >= 0 && nums1[lmi] > nums2[lni]) {
      nums1[wi--] = nums1[lmi--];
    }
    else {
      nums1[wi--] = nums2[lni--];
    }
  }
}


// Unit Tests
function runTests() {
  // Test Case 1: Simple example from the problem statement
  const test1 = () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const m = 3;
    const nums2 = [2, 5, 6];
    const n = 3;

    const expected = [1, 2, 2, 3, 5, 6]
    merge(nums1, m, nums2, n);
    console.assert(JSON.stringify(nums1) === JSON.stringify(expected),
      `Test 1 Failed: Simple merge case: \n ${consoleDiff(nums1, expected)}`);
  };

  // Test Case 2: Boundary - Empty nums2
  const test2 = () => {
    const nums1 = [1, 2, 3];
    const m = 3;
    const nums2 = [];
    const n = 0;

    const expected = [1, 2, 3]
    merge(nums1, m, nums2, n);
    console.assert(JSON.stringify(nums1) === JSON.stringify(expected),
      `Test 2 Failed: Empty nums2 case \n ${consoleDiff(nums1, expected)}`);
  };

  // Test Case 3: Boundary - Empty nums1
  const test3 = () => {
    const nums1 = [0, 0, 0];
    const m = 0;
    const nums2 = [1, 2, 3];
    const n = 3;
    merge(nums1, m, nums2, n);

    const expected = [1, 2, 3]
    console.assert(JSON.stringify(nums1) === JSON.stringify(expected),
      `Test 3 Failed: Empty nums1 case: \n ${consoleDiff(nums1, expected)}`);
  };

  // Test Case 4: Boundary - Maximum size arrays
  const test4 = () => {
    const nums1 = Array(400).fill(0);
    for (let i = 0; i < 200; i++) {
      nums1[i] = i * 2 + 2;
    }
    const m = 200;
    const nums2 = Array(200).fill(0).map((_, i) => i * 2 + 1);
    const n = 200;

    const expected = Array(400).fill(0).map((_, i) => i + 1);

    merge(nums1, m, nums2, n);
    console.assert(JSON.stringify(nums1) === JSON.stringify(expected),
      `Test 4 Failed: Maximum size arrays: \n ${consoleDiff(nums1, expected)}`);
  };

  // Test Case 5: Boundary - Negative numbers
  const test5 = () => {
    const nums1 = [-10, -5, 2, 5, 0, 0, 0];
    const m = 4;
    const nums2 = [-8, -3, 10];
    const n = 3;
    merge(nums1, m, nums2, n);

    const expected = [-10, -8, -5, -3, 2, 5, 10]
    console.assert(JSON.stringify(nums1) === JSON.stringify(expected),
      `Test 5 Failed: Negative numbers: ${consoleDiff(nums1, expected)}`)
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
