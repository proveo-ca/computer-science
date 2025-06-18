// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/

/**
 * Find the majority element in an array
 * @param {number[]} nums - The input array
 * @return {number} The majority element
 */
function majorityElement(nums) {
  let candidate = -1;
  let count = 0;

  for (const x of nums) {
    if (count === 0) {
      candidate = x;
      count = 1;
    } else if (x === candidate) {
      count++;
    } else {
      count--;
    }
  }
  return candidate;
}

module.exports = { majorityElement };
