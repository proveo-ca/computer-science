// https://www.geeksforgeeks.org/a-product-array-puzzle/

/**
 * Returns an array where each element is the product of all elements in the input array except itself.
 * @param {number[]} nums - The input array of integers
 * @return {number[]} - Array where answer[i] is the product of all elements except nums[i]
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n);

  let leftAcc = 1;
  for (let i = 0; i < n; ++i) {
    result[i] = leftAcc;
    leftAcc *= nums[i];
  }

  let rightAcc = 1;
  for (let i = n - 1; i >= 0; --i) {
    result[i] *= rightAcc;
    rightAcc *= nums[i];
  }

  return result;
}

module.exports = { productExceptSelf };
