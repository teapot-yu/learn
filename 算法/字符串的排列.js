function permutation(s) {

}

function permutationHDfs(arr, path, res, visited) {
  if (arr.length === path.length) {
    return res.push(path.join(','))
  }
  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue
    visited[i] = true
    path.push(arr[i])
    permutationHDfs(arr, path, res, visited)
    path.pop()
    visited[i] = false
  }
}



var permutation = function (s) {
  var res = new Set();
  var path = [];
  var visited = [];
  dfsHelper([...s], path, res,visited);
  return Array.from(res);
};


function dfsHelper(arr, path, res, visited) {
  if (arr.length === path.length) { //说明走到底(叶子节点)
      res.add(path.join(''))
      return;
  }

  for (let i = 0; i < arr.length; i++) {
      if(visited[i]){
          continue;
      }
      visited[i] = true;
      //进入下一层
      path.push(arr[i]);
      dfsHelper(arr, path, res,visited);
      path.pop();
      visited[i] = false;
  }
}
