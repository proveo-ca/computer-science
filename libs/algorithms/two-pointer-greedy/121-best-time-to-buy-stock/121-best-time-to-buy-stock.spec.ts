import { describe, test, expect } from "bun:test";
import { maxProfit } from "./121-best-time-to-buy-stock.js";

describe("121. Best Time to Buy and Sell Stock", () => {
  test("Example from the problem statement", () => {
    const prices = [7, 1, 5, 3, 6, 4];
    const result = maxProfit(prices);

    expect(result).toBe(5);
  });

  test("Decreasing prices - no profit", () => {
    const prices = [7, 6, 4, 3, 1];
    const result = maxProfit(prices);

    expect(result).toBe(0);
  });

  test("Single element array", () => {
    const prices = [5];
    const result = maxProfit(prices);

    expect(result).toBe(0);
  });

  test("All identical elements", () => {
    const prices = [7, 7, 7, 7, 7];
    const result = maxProfit(prices);

    expect(result).toBe(0);
  });

  test("Strictly increasing prices", () => {
    const prices = [1, 2, 3, 4, 5];
    const result = maxProfit(prices);

    expect(result).toBe(4);
  });
});
