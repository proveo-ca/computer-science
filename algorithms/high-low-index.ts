const findLowIndex = function (arr, target) {
  let high = arr.length - 1
  let mid = Math.floor(high / 2)
  let low = 0

  console.log('FINDING LOW INDEX')
  while (high >= low) {
    console.log('HIGH: ', high)
    console.log('MID: ', mid)
    console.log('LOW: ', low)
    if (target > arr[mid]) {
      low = mid + 1
    } else if (mid <= high) {
      high = mid
    }
    mid = Math.floor((high + low) / 2)

    if (low === mid && mid === high) {
      return arr[high] === target
        ? high
        : -1
    }
  }
}

const findHighIndex = function (arr, target) {
  let high = arr.length - 1
  let mid = Math.floor(high / 2)
  let low = 0
  console.log('FINDING HIGH INDEX')
  while (high >= low) {
    console.log('HIGH: ', high)
    console.log('MID: ', mid)
    console.log('LOW: ', low)
    if (target >= arr[mid]) {
      low = mid + 1
    } else {
      high = mid - 1
    }
    mid = Math.floor((high + low) / 2)

    if (low === mid && mid === high) {
      return arr[high] === target
        ? high
        : -1
    }
  }

  return -1
}
const target = 8
const array = [1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 6, 9]
const highIndex = findHighIndex(array, target)
const lowIndex = findLowIndex(array, target)

console.log('TARGET => ', target)
console.log('LOW INDEX: ', lowIndex, '=>', array[lowIndex])
console.log('HIGH INDEX: ', highIndex, '=>', array[highIndex])
