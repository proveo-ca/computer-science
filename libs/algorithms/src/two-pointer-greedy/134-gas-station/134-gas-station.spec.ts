import { describe, test, expect } from "bun:test";
import { canCompleteCircuit } from "./134-gas-station.js";

describe("134. Gas Station", () => {
  test("Example from the problem statement", () => {
    const gas = [1, 2, 3, 4, 5];
    const cost = [3, 4, 5, 1, 2];
    const result = canCompleteCircuit(gas, cost);

    expect(result).toBe(3);
  });

  test("No solution possible", () => {
    const gas = [2, 3, 4];
    const cost = [3, 4, 3];
    const result = canCompleteCircuit(gas, cost);

    expect(result).toBe(-1);
  });

  test("Single station with enough gas", () => {
    const gas = [5];
    const cost = [4];
    const result = canCompleteCircuit(gas, cost);

    expect(result).toBe(0);
  });

  test("Single station with insufficient gas", () => {
    const gas = [2];
    const cost = [3];
    const result = canCompleteCircuit(gas, cost);

    expect(result).toBe(-1);
  });

  test("Edge case with exact gas amounts", () => {
    const gas = [3, 1, 1];
    const cost = [1, 2, 2];
    const result = canCompleteCircuit(gas, cost);

    expect(result).toBe(0);
  });

  test("Maximum constraints edge case", () => {
    const gas = [0, 0, 10000];
    const cost = [0, 0, 10000];
    const result = canCompleteCircuit(gas, cost);

    expect(result).toBe(0);
  });
});
