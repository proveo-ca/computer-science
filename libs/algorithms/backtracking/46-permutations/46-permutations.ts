/**
 * Given an array nums of distinct integers, return all the possible permutations.
 * You can return the answer in any order.
 * 
 * @param {number[]} nums - Array of distinct integers
 * @return {number[][]} - Array of all possible permutations
 */
function permute(nums) {
  // https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/
  
}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const nums = [1, 2, 3];
    const result = permute(nums);
    
    const expected = [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]];
    console.assert(result.length === expected.length,
      `Test 1 Failed: Expected ${expected.length} permutations, got ${result.length}`);
    
    // Check if all expected permutations are present
    const resultStr = result.map(arr => JSON.stringify(arr)).sort();
    const expectedStr = expected.map(arr => JSON.stringify(arr)).sort();
    console.assert(JSON.stringify(resultStr) === JSON.stringify(expectedStr),
      `Test 1 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 2: Two element array
  const test2 = () => {
    const nums = [0, 1];
    const result = permute(nums);
    
    const expected = [[0,1],[1,0]];
    console.assert(result.length === expected.length,
      `Test 2 Failed: Expected ${expected.length} permutations, got ${result.length}`);
    
    const resultStr = result.map(arr => JSON.stringify(arr)).sort();
    const expectedStr = expected.map(arr => JSON.stringify(arr)).sort();
    console.assert(JSON.stringify(resultStr) === JSON.stringify(expectedStr),
      `Test 2 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 3: Single element array
  const test3 = () => {
    const nums = [1];
    const result = permute(nums);
    
    const expected = [[1]];
    console.assert(result.length === expected.length,
      `Test 3 Failed: Expected ${expected.length} permutations, got ${result.length}`);
    console.assert(JSON.stringify(result) === JSON.stringify(expected),
      `Test 3 Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  };

  // Test Case 4: Maximum constraint test (6 elements)
  const test4 = () => {
    const nums = [1, 2, 3, 4, 5, 6];
    const result = permute(nums);
    
    // 6! = 720 permutations expected
    const expectedLength = 720;
    console.assert(result.length === expectedLength,
      `Test 4 Failed: Expected ${expectedLength} permutations, got ${result.length}`);
    
    // Check that all permutations are unique
    const uniquePerms = new Set(result.map(arr => JSON.stringify(arr)));
    console.assert(uniquePerms.size === expectedLength,
      `Test 4 Failed: Expected ${expectedLength} unique permutations, got ${uniquePerms.size}`);
  };

  // Test Case 5: Negative numbers
  const test5 = () => {
    const nums = [-1, 0, 1];
    const result = permute(nums);
    
    const expectedLength = 6; // 3! = 6
    console.assert(result.length === expectedLength,
      `Test 5 Failed: Expected ${expectedLength} permutations, got ${result.length}`);
    
    // Check that all permutations contain the same elements
    for (const perm of result) {
      console.assert(perm.length === 3,
        `Test 5 Failed: Each permutation should have 3 elements, got ${perm.length}`);
      console.assert(perm.includes(-1) && perm.includes(0) && perm.includes(1),
        `Test 5 Failed: Permutation ${JSON.stringify(perm)} doesn't contain all original elements`);
    }
  };

  // Run all tests
  test1();
  test2();
  test3();
  test4();
  test5();
  
  console.log('All tests passed!');
}

// Uncomment to run tests
// runTests();
