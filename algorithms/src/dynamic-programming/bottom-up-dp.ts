function max (a, b) {
  return (a > b) ? a : b
}

// Returns the maximum value that can
// be put in a knapsack of capacity W
function knapSack (maxWeight, weights, values, n) {
  console.log('MAXIMUM WEIGHT:', maxWeight)
  console.log('WEIGHT / VALUE MAP', values.reduce((map, value, i) => ({
    ...map,
    [weights[i]]: value
  }), {}))
  let i, w
  const K = new Array(n + 1)

  // Build table K[][] in bottom up manner
  for (i = 0; i <= n; i++) {
    K[i] = new Array(maxWeight + 1)
    for (w = 0; w <= maxWeight; w++) {
      if (i == 0 || w == 0) { K[i][w] = 0 } else if (weights[i - 1] <= w) {
        K[i][w] = max(
          values[i - 1] + K[i - 1][w - weights[i - 1]],
          K[i - 1][w]
        )
      } else { K[i][w] = K[i - 1][w] }
    }
  }
  console.log(K)
  return K[n][maxWeight]
}

const values = [60, 100, 120]
const weights = [10, 20, 30]
const maxWeight = 50
const n = values.length
console.log(knapSack(maxWeight, weights, values, n))
