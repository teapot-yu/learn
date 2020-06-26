/*
  https://juejin.im/post/5d371aa6e51d455d850d3bbe#heading-6

*/

const testArr = []

function swap(i, j , arr) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
function pupperSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(j, j + 1, arr)
      }
    }
  }
  return arr
}

// 快速排序

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}

function partition(arr, left, right) {
  let pivot = left
  let index = pivot + 1
  for (let i = index; i < arr.length; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }
  swap(arr, pivot, index - 1)
  return index - 1
}