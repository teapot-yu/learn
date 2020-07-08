/**

1. 函数柯里化
（http://www.qiutianaimeili.com/html/page/2019/05/54g0vvxycyg.html）
```
function curry(fn, ...args) {
  const length = fn.length
  args = args || []
  return function(...args2) {
    const _args = args.concat(args2)
    if (_args.length === length) {
      fn.call(this, ..._args)
    }
    return curry(fn, _args)
  }
}
```


2. componse 方法实现

function componse(...args) {
  return ...args.reducer((a, b) => (...arg) => b(a(...arg)))
}

3. 偏函数实现
function partial(fn, ...arg) {
  return function() {
    fn.call(this, ...arg, ...arguments)
  }

}

4. 实现函数 bind 方法

function bind2(context, ..args) {
  const fn = this
  const FBound function(...args2) {
    const res = fn.call(this instanceof Fbount ? this : context, ...args, ...args2)
    return res
  }
  const fNOP = function() {}
  fNOP.prototype = fn.prototype

}

5. 实现函数 call 方法

6. 函数防抖
function debounce(fn, delay) {
  let timer = null
  return function() {
    clearTimeOut(timer)
    timer = setTimeout(function() {
      fn.call(this, ..arguments)
    }, delay)
  }
}

7. 函数节流

function throttle(fn, delay) {
  let flag = true
  return (...args) => {
    if(!flag) return
    flag = false
    setTimeout(() => {
      fn.call(this, ...args)
      flag = true
    }, delay)
  }

}

8. new 关键字

9. instanceof
https://juejin.im/post/5b0b9b9051882515773ae714

function instanceof(a, b) {
  const aProto = a.__proro__
  while(aProto) {
    if(aProto === b.prototype) return true
    aProto = aProto.__proto__
  }
  return false

}


10. 深拷贝实现

11. Promise实现
（https://github.com/YvetteLau/Blog/issues/2）

13. 发布订阅模式实现

14. 私有变量的实现

15. 单例模式实现

16. async/await实现

17. faltten实现
function flatten(arr) {
  return arr.reducer((a,b) => a.concat(isArray(b) ? flatten(b) : b), [])
}

18. 手写ajax


19. parseURL方法
function parseUrl(url) {
  return url.match(/([^?&=])(=([^&]))/g)
}

20. 实现一个add函数，满足，add(1), add(1)(2), add(1,2,3), add(1)(2)(3)

21. jsonp实现
*/


class MyComponent extends Component {
  someFunc = () => {
    // this.state.count: 1
    this.setState({
      count: this.state.count + 1,
    })
    this.setState({
      count: this.state.count + 1,
    })
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1,
      })
      console.log(this.state.count) // ---> ?
    }, 0);
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1,
      })
      console.log(this.state.count) // ---> ?
    }, 0);
    console.log(this.state.count) // ---> ?
    console.log(this.state.count) // ---> ?

  }
  render() {
    return (...)
  }
}
