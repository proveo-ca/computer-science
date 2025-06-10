import { consoleDiff } from '../../../utils/consoleDiff.js'
// https://www.geeksforgeeks.org/program-for-array-rotation-continued-reversal-algorithm/
/**
 * Rotate an array to the right by k steps
 * @param {number[]} nums - The array to rotate
 * @param {number} k - Number of steps to rotate right
 * @return {void} Do not return anything, modify nums in-place instead
 */
// function rotate(nums, k) {
//   let n = nums.length
//   k = k % n
//   if(k !== 0){
//     let end = nums.splice(n-k, k)
//     nums.unshift(...end)
//   }
// };
function rotate(nums, k) {
  const n = nums.length;
  if (n === 0) return;

  k %= n;
  if (k === 0) return;

  nums.reverse()
  partialReverse(nums, 0, k - 1);
  partialReverse(nums, k, n - 1)

  function partialReverse(array, si, fi) {
    while (si < fi) {

      let temp = array[si]
      array[si] = array[fi]
      array[fi] = temp
      si++
      fi--
    }
  }
}

// Unit Tests
function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;
    rotate(nums, k);

    const expected = [5, 6, 7, 1, 2, 3, 4];
    console.assert(JSON.stringify(nums) === JSON.stringify(expected),
      `Test 1 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(nums)}`);
  };

  // Test Case 2: Another example from the problem statement
  const test2 = () => {
    const nums = [-1, -100, 3, 99];
    const k = 2;
    rotate(nums, k);

    const expected = [3, 99, -1, -100];
    console.assert(JSON.stringify(nums) === JSON.stringify(expected),
      `Test 2 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(nums)}`);
  };

  // Test Case 3: Boundary - k is 0 (no rotation)
  const test3 = () => {
    const nums = [1, 2, 3, 4, 5];
    const k = 0;
    rotate(nums, k);

    const expected = [1, 2, 3, 4, 5];
    console.assert(JSON.stringify(nums) === JSON.stringify(expected),
      `Test 3 Failed: With k=0, array should remain unchanged`);
  };

  // Test Case 4: Boundary - k is greater than array length
  const test4 = () => {
    const nums = [1, 2, 3, 4];
    const k = 6; // Equivalent to rotating by 2 (6 % 4 = 2)
    rotate(nums, k);

    const expected = [3, 4, 1, 2];
    console.assert(JSON.stringify(nums) === JSON.stringify(expected),
      `Test 4 Failed: When k > array length, should rotate by k % array.length`);
  };

  // Test Case 5: Boundary - Single element array
  const test5 = () => {
    const nums = [42];
    const k = 5;
    rotate(nums, k);

    const expected = [42];
    console.assert(JSON.stringify(nums) === JSON.stringify(expected),
      `Test 5 Failed: Single element array should remain unchanged regardless of k`);
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
