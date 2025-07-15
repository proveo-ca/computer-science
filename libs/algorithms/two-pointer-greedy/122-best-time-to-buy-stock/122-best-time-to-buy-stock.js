/**
 * Find the maximum profit from buying and selling a stock multiple times
 * @param {number[]} prices - Array of stock prices where prices[i] is the price on day i
 * @return {number} The maximum profit that can be achieved
 */
function maxProfit(prices) {
  let profit = 0
  for (let i = 1; i < prices.length; ++i) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1]
    }
  }
  return profit
}

export { maxProfit };
