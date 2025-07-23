import { sleep } from '../../../../utils/sleep.js'

/**
 * Calculates the minimum number of jumps needed to reach the last index
 * @param {number[]} nums - Array of integers representing maximum jump lengths
 * @return {number} - Minimum number of jumps to reach the last index
 */
async function jump(nums) {
  if (nums.length <= 1) return 0;

  const goal = nums.length - 1
  let jumps = 0
  let maxi = 0
  let max = nums[0]

  while (maxi < goal) {
    let i = maxi + 1
    const j = nums[maxi]
    const reach = Math.min(maxi + j, goal)

    // Assume next first element as new max
    max = nums[i]
    maxi = i
    while (i < reach) {
      i++
      if (i === goal || (nums[i] > 0 && (nums[i] + i) >= (max + maxi))) {
        max = nums[i]
        maxi = i
      }
    }
    jumps++
    await sleep(100)
  }
  return jumps
}

async function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = async () => {
    const nums = [2, 3, 1, 1, 4];
    const result = await jump(nums);

    const expected = 2;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Second example from the problem statement
  const test2 = async () => {
    const nums = [2, 3, 0, 1, 4];
    const result = await jump(nums);

    const expected = 2;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Single element array
  const test3 = async () => {
    const nums = [0];
    const result = await jump(nums);

    const expected = 0;
    console.assert(result === expected,
      `Test 3 Failed: Single element array should return ${expected}, got ${result}`);
  };

  // Test Case 4: Array where each element allows exactly one step
  const test4 = async () => {
    const nums = [1, 1, 1, 1, 1];
    const result = await jump(nums);

    const expected = 4;
    console.assert(result === expected,
      `Test 4 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: Array with large jumps
  const test5 = async () => {
    const nums = [5, 9, 3, 2, 1, 0, 2, 3, 3, 0, 1];
    const result = await jump(nums);

    const expected = 2;
    console.assert(result === expected,
      `Test 5 Failed: Expected ${expected}, got ${result}`);
  };

  await test1();
  await test2();
  await test3();
  await test4();
  await test5();
  console.log("All tests completed");
}

runTests();
