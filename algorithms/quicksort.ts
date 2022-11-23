function swap (array, index1, index2) {
  const temp = array[index1]
  array[index1] = array[index2]
  array[index2] = temp
}

function sectionSort (nums, lowIndex, highIndex, partitionFn) {
  if (highIndex > lowIndex) {
    const pivotIndex = partitionFn(nums, lowIndex, highIndex)
    console.log('ARRAY: ', nums.slice(lowIndex, highIndex + 1))
    console.log('LOW INDEX:', lowIndex, `(PARTITION INDEX: ${pivotIndex} VALUE: ${nums[pivotIndex]})`, 'HIGH INDEX:', highIndex)
    console.log('LEFT PARTITION')
    // sectionSort(nums, lowIndex, pivotIndex - 1, partitionFn)
    sectionSort(nums, lowIndex, pivotIndex, partitionFn)
    console.log('RIGHT PARTITION')
    sectionSort(nums, pivotIndex + 1, highIndex, partitionFn)
  }
}

function educativePartition (nums, lowIndex, highIndex) {
  console.log('PARTITIONING: ', nums.slice(lowIndex, highIndex + 1), 'PIVOT VALUE: ', nums[lowIndex])
  const pivotValue = lowIndex
  let lowIndexPointer = lowIndex
  let highIndexPointer = highIndex

  while (lowIndexPointer < highIndexPointer) {
    console.log('LOW INDEX: ', lowIndexPointer, 'HIGH INDEX: ', highIndexPointer)
    while (nums[pivotValue] >= nums[lowIndexPointer]) {
      lowIndexPointer++
    }

    while (nums[pivotValue] < nums[highIndexPointer]) {
      highIndexPointer--
    }

    if (lowIndexPointer <= highIndexPointer) {
      console.log(` ${nums[pivotValue]} < ${nums[lowIndexPointer]} | ${nums[pivotValue]} > ${nums[highIndexPointer]} `)

      swap(nums, lowIndexPointer, highIndexPointer)
      console.log('SWAP~', `${nums[lowIndexPointer]}<>${nums[highIndexPointer]}`, nums)
    }
  }

  swap(nums, lowIndex, highIndexPointer)
  console.log('HOARE\'S J SWAP WITH THE PIVOT~', `${nums[lowIndex]}<>${nums[highIndexPointer]}`, nums)
  return highIndexPointer
}

function educativeQuickSort (nums) {
  console.log('\n EDUCATIVE VERSION \n')
  if (nums.length <= 1) {
    return nums
  }

  sectionSort(nums, 0, nums.length - 1, educativePartition)
  console.log('DONE: ', nums)
}

function hoarePartition (nums, lowIndex, highIndex) {
  console.log('PARTITIONING: ', nums.slice(lowIndex, highIndex + 1), 'PIVOT VALUE: ', nums[lowIndex])

  const pivotValue = nums[lowIndex]
  let lowIndexPointer = lowIndex - 1
  let highIndexPointer = highIndex + 1

  while (true) {
    do {
      lowIndexPointer++
    } while (pivotValue > nums[lowIndexPointer])

    do {
      highIndexPointer--
    } while (pivotValue < nums[highIndexPointer])

    if (lowIndexPointer >= highIndexPointer) {
      return highIndexPointer
    }
    console.log('LOW INDEX: ', lowIndexPointer, 'HIGH INDEX: ', highIndexPointer)

    console.log(` ${pivotValue} <= ${nums[lowIndexPointer]} | ${pivotValue} > ${nums[highIndexPointer]}`)
    swap(nums, lowIndexPointer, highIndexPointer)
    console.log('SWAP~', `${nums[highIndexPointer]}<>${nums[lowIndexPointer]}`, nums)
  }
}

function hoareQuickSort (nums) {
  if (nums.length <= 1) {
    return nums
  }

  sectionSort(nums, 0, nums.length - 1, hoarePartition)
  console.log('DONE: ', nums)
}

// educativeQuickSort([23, 55, 26, 2, 25])
// hoareQuickSort([23, 55, 26, 2, 25])

// educativeQuickSort([1, 20, 30, 1, 2])
// hoareQuickSort([1, 20, 30, 1, 2])

// educativeQuickSort([55, 23, 26, 2, 18, 78, 23, 8, 2, 3])
hoareQuickSort([55, 23, 26, 2, 18, 78, 23, 8, 2, 3])
