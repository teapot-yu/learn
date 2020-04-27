/**
 * 深克隆的实现方法
使用JSON.stringify存在哪些问题。
1. 无法实现对函数 、RegExp等特殊对象的克隆
2. 会抛弃对象的constructor,所有的构造函数会指向Object
3. 对象有循环引用,会报错
4. 可能会爆栈
*/

const obj = {
  name: 'iii',
  year: 23,
  children: {
      name: 'fffff',
      year: 30,
    }
}

function clone(data) {
  const result = {}
  const nodeList = [{
    target: result,
    key: undefined,
    data
  }]
  while(nodeList.length) {
    const node = nodeList.pop()
    const target = node.target
    if (typeof node.key !== 'undefined') {
      target = node.target[node.key] = {}
    }
    for (let k in node.data) {
      if (node.data.hasOwnProperty[k]) {
        if (typeof node.data[k] === 'object') {
          nodeList.push({
            target: target,
            key: k,
            data
          })
        } else {
          target[k] = node.data[k]
        }
      }
    }
  }
}

/** Event Bus 实现 */

function EventBus() {
  this.events = {}
}

EventBus.prototype.addEventListen = function(eventName, handler) {
  if (this.events[eventName] && this.events[eventName].length) {
    this.events[eventName].push(handler)
  } else {
    this.events[eventName] =[handler]
  }
}

EventBus.prototype.emit = function(eventName, ...args) {
  const eventList = this.events[eventName]
  eventList.forEach(item => {
    item.call(this, ...args)
  })
}

const eventBus = new EventBus()
eventBus.addEventListen('click', (name) => {
  console.log('your click a button' + name)
})
eventBus.emit('click', ' 茶壶')

/**

1. 判断对象的数据类型

2. 循环实现数组 map 方法

3. 使用 reduce 实现数组 map 方法

4. 循环实现数组 filter 方法

5. 使用 reduce 实现数组 filter 方法

6. 循环实现数组的 some 方法

7. 循环实现数组的 reduce 方法

8. 使用 reduce 实现数组的 flat 方法

9. 实现 ES6 的 class 语法

10. 函数柯里化

11. 函数柯里化（支持占位符）

12. 偏函数

13. 斐波那契数列及其优化

14. 实现函数 bind 方法

15. 实现函数 call 方法

16. 简易的 CO 模块

17. 函数防抖

18. 函数节流

19. 图片懒加载

20. new 关键字

21. 实现 Object.assign

22. instanceof

23. 私有变量的实现

24. 洗牌算法

25. 单例模式

26. promisify

27. 优雅的处理 async/await

28. 发布订阅 EventEmitter

29. 实现 JSON.stringify（附加）

30. 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

25. 实现extend函数

*/
