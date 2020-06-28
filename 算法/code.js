/**字符串全排列**/
var permutation = function (s) {
  var res = new Set();
  var path = [];
  var visited = [];
  dfsHelper([...s], path, res, visited);
  return Array.from(res);
};

function dfsHelper(arr, path, res, visited) {
  if (arr.length === path.length) { //说明走到底(叶子节点)
      res.add(path.join(''))
      return;
  }

  for (let i = 0; i < arr.length; i++) {
      if (visited[i]) {
        continue;
      }
      visited[i] = true;
      //进入下一层
      path.push(arr[i]);
      dfsHelper(arr, path, res, visited);
      path.pop();
      visited[i] = false;
  }

}

/**路径和**/
var pathSum = function(root, sum) {
  if (!root) {
      return [];
  }
  const pathes = [];
  __pathSum(root, sum, pathes, []);
  return pathes;
};

function __pathSum(root, sum, pathes, path) {
  if (!root) {
      return;
  }

  path = [...path, root.val]; // 深拷贝

  if (!root.left && !root.right && root.val === sum) {
      pathes.push(path);
      return;
  }

  __pathSum(root.left, sum - root.val, pathes, path);
  __pathSum(root.right, sum - root.val, pathes, path);
}

/**机器人移动范围**/
var movingCount = function(m, n, k) {
  let res = 0;
  const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
  ];
  const visited = {};
  dfs(0, 0);
  return res;

  function dfs(x, y) {
      visited[`${x}-${y}`] = true;
      if (bitSum(x) + bitSum(y) > k) {
          return;
      }
      ++res;

      for (const direction of directions) {
          const newx = direction[0] + x;
          const newy = direction[1] + y;
          if (
              !visited[`${newx}-${newy}`] &&
              newx >= 0 &&
              newy >= 0 &&
              newx < m &&
              newy < n
          ) {
              dfs(newx, newy);
          }
      }
  }
};

/**第K个排列**/
var getPermutation = function(n, k) {
  let res = []
  let used = {}
  function backtrace(str) {
      if(str.length === n) {
          res.push(str)
          return
      }
      for(let i = 1; i <= n; i++) {
          if(used[i]){
              continue
          }
          str += i
          used[i] = true
          backtrace(str)
          str = str.substr(0, str.length - 1)
          used[i] = false
      }
  }
  backtrace('')
  return res[k - 1]
};

/**三数之和**/

var threeSum = function(nums) {
  let ans = [];
  const len = nums.length;
  if(nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len ; i++) {
      if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
      if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
      let L = i+1;
      let R = len-1;
      while(L < R){
          const sum = nums[i] + nums[L] + nums[R];
          if(sum == 0){
              ans.push([nums[i],nums[L],nums[R]]);
              while (L<R && nums[L] == nums[L+1]) L++; // 去重
              while (L<R && nums[R] == nums[R-1]) R--; // 去重
              L++;
              R--;
          }
          else if (sum < 0) L++;
          else if (sum > 0) R--;
      }
  }
  return ans;
};

/**排序**/
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

/**剪绳子**/
var cuttingRope = function(n) {
  const dp = new Array(n + 1).fill(1)
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i-j])
    }
  }
};

/**最大正方形**/
var maximalSquare = function(matrix) {
  if (matrix.length === 0) return 0;
  const dp = [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  let max = Number.MIN_VALUE;

  for (let i = 0; i < rows + 1; i++) {
    if (i === 0) {
      dp[i] = Array(cols + 1).fill(0);
    } else {
      dp[i] = [0];
    }
  }

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        max = Math.max(max, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return max * max;
};

/**股票问题**/

function maxProfit(prices) {
  let min = prices[0];
  let max = 0;
  for (let i in prices) {
    i = Number(i)
    if (i === 0) continue;
    const price = prices[i]
    if (price - min > max) max = price - min
    if (price < min) min = price
  }
  return max
}

var maxProfit = function(prices) {
  let last = 0
  let max = 0
  for (let i = 0; i < prices.length-1; i++) {
      last = Math.max(0, last + prices[i+1]-prices[i])
      max = Math.max(max,last)
  }
  return max
}


var maxProfit = function(prices) {
  let n = prices.length;
  if(n == 0){
      return 0;
  }
  let dp = Array.from(new Array(n),() => new Array(2));
  for(let i = 0;i < n;i++){
      if(i == 0){
          dp[i][0] = 0;
          dp[i][1] = -prices[i];
          continue;
      }
      dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i]);
      dp[i][1] = Math.max(-prices[i],dp[i-1][1]);
  }
  return dp[n-1][0];
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let n = prices.length;
  if(n == 0){
      return 0;
  }
  var dp_i_0 = 0;
  var dp_i_1 = -Infinity;
  for(let i = 0;i < n;i++){
      dp_i_0 = Math.max(dp_i_0,dp_i_1 + prices[i]);
      dp_i_1 = Math.max(-prices[i],dp_i_1);
  }
  return dp_i_0;
};

/**求素数**/

function isPrime(num) {
  if (num <= 3) {
    return num > 1
  } else {
    let sq = Math.sqrt(num)
    for (let i = 2; i <= sq; i++) {
     if (num % i === 0) {
       return false
     }
    }
    return true
  }
}

/**求最大公约数**/

function gcd(a, b) {
  if (a % b === 0) {
      return b;
  }
  return arguments.callee(b, a % b);
}

/**求最小公倍数**/

function getLcm(a, b) {
  return a * b / getGcd(a, b);
}