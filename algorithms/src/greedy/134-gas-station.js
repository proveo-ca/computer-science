import { consoleDiff } from '../../../utils/consoleDiff.js';

/**
 * Determines if you can travel around a circular route of gas stations
 * @param {number[]} gas - Array of gas amounts at each station
 * @param {number[]} cost - Array of gas costs to travel to next station
 * @return {number} Starting station index if possible, -1 otherwise
 */
function canCompleteCircuit(gas, cost) {
  // https://www.geeksforgeeks.org/find-a-tour-that-visits-all-stations/

}

function runTests() {
  // Test Case 1: Example from the problem statement
  const test1 = () => {
    const gas = [1, 2, 3, 4, 5];
    const cost = [3, 4, 5, 1, 2];
    const result = canCompleteCircuit(gas, cost);

    const expected = 3;
    console.assert(result === expected,
      `Test 1 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 2: No solution possible
  const test2 = () => {
    const gas = [2, 3, 4];
    const cost = [3, 4, 3];
    const result = canCompleteCircuit(gas, cost);

    const expected = -1;
    console.assert(result === expected,
      `Test 2 Failed: Expected ${expected}, got ${result}`);
  };

  // Test Case 3: Single station
  const test3 = () => {
    const gas = [5];
    const cost = [4];
    const result = canCompleteCircuit(gas, cost);

    const expected = 0;
    console.assert(result === expected,
      `Test 3 Failed: Single station with enough gas: Expected ${expected}, got ${result}`);
  };

  // Test Case 4: Single station insufficient gas
  const test4 = () => {
    const gas = [2];
    const cost = [3];
    const result = canCompleteCircuit(gas, cost);

    const expected = -1;
    console.assert(result === expected,
      `Test 4 Failed: Single station with insufficient gas: Expected ${expected}, got ${result}`);
  };

  // Test Case 5: Edge case with exact gas amounts
  const test5 = () => {
    const gas = [3, 1, 1];
    const cost = [1, 2, 2];
    const result = canCompleteCircuit(gas, cost);

    const expected = 0;
    console.assert(result === expected,
      `Test 5 Failed: Exact gas amounts: Expected ${expected}, got ${result}`);
  };

  // Test Case 6: Maximum constraints edge case
  const test6 = () => {
    const gas = [0, 0, 10000];
    const cost = [0, 0, 10000];
    const result = canCompleteCircuit(gas, cost);

    const expected = 0;
    console.assert(result === expected,
      `Test 6 Failed: Maximum values edge case: Expected ${expected}, got ${result}`);
  };

  // Run all tests
  test1();
  test2();
  test3();
  test4();
  test5();
  test6();

  console.log('All tests passed!');
}

// Uncomment to run tests
// runTests();

export { canCompleteCircuit, runTests };
