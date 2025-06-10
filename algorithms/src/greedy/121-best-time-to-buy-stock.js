import { consoleDiff } from '../../../utils/consoleDiff.js'

/**
 * Find the maximum profit from buying and selling a stock
 * @param {number[]} prices - Array of stock prices where prices[i] is the price on day i
 * @return {number} The maximum profit that can be achieved
 */
function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const profit = prices[i] - minPrice
    if (prices[i] < minPrice) {
      minPrice = prices[i]
    } else if (profit > maxProfit) {
      maxProfit = profit
    }
  }

  return maxProfit;
}

// Unit Tests
function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const prices = [7, 1, 5, 3, 6, 4];
    const result = maxProfit(prices);

    const expected = 5;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: Another example from the problem statement
  const test2 = () => {
    const prices = [7, 6, 4, 3, 1];
    const result = maxProfit(prices);

    const expected = 0;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Boundary - Array with single element
  const test3 = () => {
    const prices = [5];
    const result = maxProfit(prices);

    const expected = 0;
    console.assert(result === expected,
      `Test 3 Failed: Single element array should return ${expected}, got ${result}`);
  };

  // Test Case 4: Boundary - Array with all identical elements
  const test4 = () => {
    const prices = [7, 7, 7, 7, 7];
    const result = maxProfit(prices);

    const expected = 0;
    console.assert(result === expected,
      `Test 4 Failed: Array with all identical elements should return ${expected}, got ${result}`);
  };

  // Test Case 5: Boundary - Array with strictly increasing prices
  const test5 = () => {
    const prices = [1, 2, 3, 4, 5];
    const result = maxProfit(prices);

    const expected = 4;
    console.assert(result === expected,
      `Test 5 Failed: Array with strictly increasing prices should return ${expected}, got ${result}`);
  };

  // Run all tests
  test1();
  test2();
  test3();
  test4();
  test5();
  console.log("All tests passed!");
}

// Execute tests
runTests();
