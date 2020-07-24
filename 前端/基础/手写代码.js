/**

1. 函数柯里化
（http://www.qiutianaimeili.com/html/page/2019/05/54g0vvxycyg.html）

2. componse 方法实现

function componse(...fns) {
  return fns.reducer((a,b) => (...arg) => b(a(...args)))
}

3. 偏函数实现

4. 实现函数 bind 方法

Function.prototype.bind = function(context, ...args) {
  const fn = this
  function fBound(..args2) {
    return fn.call(this instanceOf fBound ? this : context, ...args, ...args2)
  }
  fBound.prototype = Object.create(fn.prototype)
  return fBound
}

5. 实现函数 call 方法

6. 函数防抖

function debounce(fn, delay) {
  let timer = null
  return funciton() {
    clearTimeout(timer)
    timer =setTimeout(() => {
      fn.call(this, ...arguments)
    }, delay)
  }

}

7. 函数节流


8. new 关键字

function createFun(fn, ...args) {
  const obj = Object.create(fn.prototype)
  obj.fn = fn
  const res = obj.fn(...args)
  delete obj.fn
  typeof res === 'object' ? res " : obj

}

9. instanceof
https://juejin.im/post/5b0b9b9051882515773ae714

function instanceof(a, b) {
  let left = a.__proto__
  let right = b.prototype

  while(true) {
    if (left === rigth) {
      return true
    }
    if (left === null) {
      return false
    }
    left = left.__proto__
  }
}

10. 深拷贝实现

11. Promise实现
（https://github.com/YvetteLau/Blog/issues/2）

13. 发布订阅模式实现

14. 私有变量的实现

15. 单例模式实现

16. async/await实现

17. faltten实现


18. 手写ajax

19. parseURL方法

20. BFS实现




*/

