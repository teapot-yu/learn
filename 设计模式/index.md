## 观察者模式

const Events = function() {
  let eventMap = {}
  const listen = function(eventName, fn) {
    if (eventmap[eventName]) {
      eventmap[eventName].push(fn)
    } else {
      eventmap[eventName] = [fn]
    }
  }
  const on = function(eventName)
}
## 订阅-发布