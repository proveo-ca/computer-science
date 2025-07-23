// function rotate(nums, k) {
//   let n = nums.length
//   k = k % n
//   if(k !== 0){
//     let end = nums.splice(n-k, k)
//     nums.unshift(...end)
//   }
// };
/**
 * Rotate an array to the right by k steps
 * @param {number[]} nums - The array to rotate
 * @param {number} k - Number of steps to rotate right
 * @return {void} Do not return anything, modify nums in-place instead
 */
function rotate(nums: number[], k: number): void {
  const n = nums.length;
  if (n === 0) return;

  k %= n;
  if (k === 0) return;

  nums.reverse()
  partialReverse(nums, 0, k - 1);
  partialReverse(nums, k, n - 1)

  function partialReverse(array, si, fi) {
    while (si < fi) {

      let temp = array[si]
      array[si] = array[fi]
      array[fi] = temp
      si++
      fi--
    }
  }
}

export { rotate };
