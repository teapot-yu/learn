function scope1() {
  var a = 1;
  (function a () {
      a = 2;
      console.log(a);
  })();
  console.log(a)
}
// scope1()

function scope2() {
  var a = 1;
  (function b () {
      let a = 2;
      console.log(a);
  })();
  console.log(a)
}

// scope2()

function let1() {
  let a
  console.log(a)
  a = 2
}

// let1()





/** 事件循环1 **/

function eventLoop() {
  console.log('script start')

  async function async1() {
    await async2()
    console.log('async1 end')
  }

  async function async2() {
    console.log('async2 end')
  }
  async1()

  process.nextTick(() => {
    console.log('nexttick1')
  })
  setTimeout(function() {
    console.log('setTimeout')
  }, 0)

  process.nextTick(() => {
    console.log('nexttick2')
  })

  new Promise(resolve => {
    console.log('Promise')
    resolve()
  })
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

  console.log('script end')
}

// eventLoop()


function quickSort1(arr) {
  if (arr.length <= 1) {
    return arr
  }
  const pivot = arr[0]
  const leftArr = []
  const rightArr = []
  arr.forEach(item => {
    if (item <= pivot) {
      leftArr.push(item)
    } else {
      rightArr.push(item)
    }
  })
  return quickSort(leftArr).concat(pivot, rightArr)
}

function quickSort2(arr, startIndex = 0, endIndex = arr.length - 1) {
  if(startIndex >= endIndex) {
    return
  }
  const pivotIndex = partation(arr, startIndex, endIndex)
  quickSort2(arr, startIndex, pivotIndex - 1)
  quickSort2(arr, pivotIndex + 1, endIndex)
}

function partation(arr, startIndex, lastIndex) {
  const pivot = arr[startIndex]
  const mark = startIndex
  for (let i = startIndex + 1; i < lastIndex; i++) {
    if (arr[i] < pivot) {
      mark++
      const tmp = arr[mark]
      arr[mark] = arr[i]
      arr[i] = tmp
    }
  }
  arr[startIndex] = arr[mark]
  arr[mark] = pivot
  return mark
}


function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  const midIndex = Math.floor(arr.length / 2)
  const left = arr.slice(0, midIndex)
  const tight = arr.slice(midIndex)
  return merge(mergeSort(left), mergeSort(right))
}

const merge = (left, right) => {
  const result = [];

  while (left.length && right.length) {
      // 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
      if (left[0] <= right[0]) {
          result.push(left.shift()); //每次都要删除left或者right的第一个元素，将其加入result中
      } else {
          result.push(right.shift());
      }
  }
  //将剩下的元素加上
  while (left.length) result.push(left.shift());

  while (right.length) result.push(right.shift());

  return result;
};



function search(arr, target) {
  let low = 0
  let high = arr.length - 1
  let mid
  while(low <= high) {
    mid = Math.floor((low + high) / 2)
    if(arr[mid]==target){
      return mid;
    } else if(arr[mid]<target){
      low = mid + 1;
    } else {
      height = mid - 1;
    }
  }
  return -1
}

function randomNum(min, max) {
  return parseInt(Math.random()*(max-min+1) + min, 10)
}


function breadthFirstSearch(node) {
  var nodes = [];
  if (node != null) {
      var queue = [];
      queue.unshift(node);
      while (queue.length != 0) {
          var item = queue.shift();
          nodes.push(item);
          var children = item.children;
          for (var i = 0; i < children.length; i++)
              queue.push(children[i]);
      }
  }
  return nodes;
}


String.prototype.dup = function () {
  let str = this
  console.log(typeof this) // object
}