  /**
 * Calculates the h-index of a researcher based on citation counts
 * @param {number[]} citations - Array of integers where citations[i] is the number of citations for the ith paper
 * @return {number} - The researcher's h-index
 */
function hIndex(citations: number[]): number {
  // https://www.geeksforgeeks.org/find-h-index-for-a-researcher/
    const n = citations.length
    const freq = Array.from({ length: n + 1 }, () => 0)
    let h = 0

    citations.forEach((c) => {
      c < n ? freq[c] += 1 : freq[n] += 1
    })

    for (let i = n; i >= 0; i--) {
      h += freq[i]
      if (h >= i) return i
    }
}

export { hIndex };
