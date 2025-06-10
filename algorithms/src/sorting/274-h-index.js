// Similar idea to https://www.geeksforgeeks.org/counting-sort/
// We can count the frequency of citations per paper on indices

/**
 * Calculates the h-index of a researcher based on citation counts
 * @param {number[]} citations - Array of integers where citations[i] is the number of citations for the ith paper
 * @return {number} - The researcher's h-index
 */
function hIndex(citations) {
  const n = citations.length
  const freq = Array.from({ length: n + 1 }).fill(0)
  let h = 0

  citations.forEach((c) => {
    c < n ? freq[c] += 1 : freq[n] += 1
  })

  for (let i = n; i >= 0; i--) {
    h += freq[i]
    if (h >= i) return i
  }
}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const citations = [3, 0, 6, 1, 5];
    const result = hIndex(citations);

    const expected = 3;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Second example from the problem statement
  const test2 = () => {
    const citations = [1, 3, 1];
    const result = hIndex(citations);

    const expected = 1;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: All papers have the same number of citations
  const test3 = () => {
    const citations = [5, 5, 5, 5, 5];
    const result = hIndex(citations);

    const expected = 5;
    console.assert(result === expected,
      `Test 3 Failed: When all papers have equal citations, h-index should be ${expected}, got ${result}`);
  };

  // Test Case 4: No citations
  const test4 = () => {
    const citations = [0, 0, 0, 0, 0];
    const result = hIndex(citations);

    const expected = 0;
    console.assert(result === expected,
      `Test 4 Failed: With no citations, h-index should be ${expected}, got ${result}`);
  };

  // Test Case 5: Single paper
  const test5 = () => {
    const citations = [100];
    const result = hIndex(citations);

    const expected = 1;
    console.assert(result === expected,
      `Test 5 Failed: With a single paper, h-index should be ${expected}, got ${result}`);
  };

  test1();
  test2();
  test3();
  test4();
  test5();
  console.log("All tests completed");
}

runTests()
