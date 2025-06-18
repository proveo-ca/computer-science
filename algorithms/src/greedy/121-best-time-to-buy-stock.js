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

module.exports = { maxProfit };
