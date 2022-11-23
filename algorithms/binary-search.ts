function feelingLucky (nums, target, low, mid, high) {

}

function binarySearchRotated (nums, target) {
  const index = -1
  let low = 0
  let high = nums.length - 1
  const mid = Math.floor(high / 2)

  while (low <= high) {
    if (low > high) {
      return -1
    }
    if (target === nums[low]) {
      return low
    } else if (target === nums[mid]) {
      return mid
    } else if (target === nums[high]) {
      return high
    }

    if (nums[high] > nums[mid] && target > nums[mid]) {
      low = mid + 1
    } else if (target < nums[high]) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return index
}

function run () {

}

console.log('binarySearchRotated([6, 7, 1, 2, 3, 4, 5], 3): ', binarySearchRotated([6, 7, 1, 2, 3, 4, 5], 3))
console.log('binarySearchRotated([6, 7, 1, 2, 3, 4, 5], 3): ', binarySearchRotated([6, 7, 1, 2, 3, 4, 5], 6))
console.log('binarySearchRotated([6, 7, 1, 2, 3, 4, 5], 3): ', binarySearchRotated([4, 5, 6, 1, 2, 3], 3))
console.log('binarySearchRotated([6, 7, 1, 2, 3, 4, 5], 3): ', binarySearchRotated([4, 5, 6, 1, 2, 3], 6))
console.log('binarySearchRotated([6, 7, 1, 2, 3, 4, 5], 3): ', binarySearchRotated([4], 1))
