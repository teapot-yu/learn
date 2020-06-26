## 为什么选择使用框架而不是原生?
1. 组件化: 其中以 React 的组件化最为彻底,甚至可以到函数级别的原子组件,高度的组件化可以是我们的工程易于维护、易于组合拓展。
2. 天然分层: JQuery 时代的代码大部分情况下是面条代码,耦合严重,现代框架不管是 MVC、MVP还是MVVM 模式都能帮助我们进行分层，代码解耦更易于读写。
3. 生态: 现在主流前端框架都自带生态,不管是数据流管理架构还是 UI 库都有成熟的解决方案。
4. 开发效率: 现代前端框架都默认自动更新DOM,而非我们手动操作,解放了开发者的手动DOM成本,提高开发效率,从根本上解决了UI 与状态同步问题。

## React 的工作原理
简单来说就是虚拟dom + diff。
初始化时React 会创建一个虚拟 DOM(virtual DOM)树。当一个组件中的状态改变时，React 首先会通过 “diff” 算法来标记虚拟 DOM 中的改变，第二步是调节(reconciliation)，会用 diff 的结果来更新 DOM。

## 什么是JSX

JSX 是 JavaScript XML 的简写。是 React 使用的一种文件，它利用 JavaScript 的表现力和类似 HTML 的模板语法。这使得 HTML 文件非常容易理解。此文件能使应用非常可靠，并能够提高其性能。


##  虚拟DOM的优劣如何

#### 优点:

1. 保证性能下限: 虚拟DOM可以经过diff找出最小差异,然后批量进行patch,这种操作虽然比不上手动优化,但是比起粗暴的DOM操作性能要好很多。

2. 无需手动操作DOM: 虚拟DOM的diff和patch都是在一次更新中自动进行的,我们无需手动操作DOM,极大提高开发效率

3. 跨平台: 虚拟DOM本质上是JavaScript对象,而DOM与平台强相关,相比之下虚拟DOM可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等

虚拟 DOM 具有 batching(批处理) 和高效的 Diff 算法，确保只对界面上真正变化的部分进行实际的 DOM 操作。
React 从来没有说过 “React 比原生操作 DOM 快”。React 给我们的保证是，在不需要手动优化的情况下，它依然可以给我们提供过得去的性能。

下面还是借鉴了知乎上的回答：没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。

#### 缺点:

1. 无法进行极致优化: 在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化

## 虚拟DOM实现原理?

在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，结果仅仅是轻量级的 JavaScript 对象，我们称之为 virtual DOM。

简单总结来说虚拟DOM本质上是JavaScript对象,是对真实DOM的抽象，状态变更时，找出新树和旧树的差异，最后把差异更新到真正的dom中。

## 当渲染一个列表时，何为 key？设置 key 的目的是什么
Key 会有助于 React 识别哪些 items 改变了，被添加了或者被移除了。

很多时候你会使用数据中的 IDs 作为 keys，当你没有稳定的 IDs 用于被渲染的 items 时，可以使用项目索引作为渲染项的 key，但这种方式并不推荐，如果 items 可以重新排序，就会导致 re-render 变慢。

## React最新的生命周期是怎样的?
React 16之后有三个生命周期被废弃(但并未删除)

componentWillMount

componentWillReceiveProps

componentWillUpdate

官方计划在17版本完全删除这三个函数，只保留UNSAVE_前缀的三个函数，目的是为了向下兼容，但是对于开发者而言应该尽量避免使用他们，而是使用新增的生命周期函数替代它们

目前React 16.8 +的生命周期分为三个阶段,分别是挂载阶段、更新阶段、卸载阶段

#### 挂载阶段

1. constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this
2. getDerivedStateFromProps: 这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps
3. render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容
4. componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅

#### 更新阶段

1. getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用
2. shouldComponentUpdate：有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能
3. render: 更新阶段也会触发此生命周期
4. getSnapshotBeforeUpdate: 这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用
5. componentDidUpdate: 该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。
#### 卸载阶段

1. componentWillUnmount: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

## React的请求应该放在哪个生命周期中?
React的异步请求到底应该放在哪个生命周期里,有人认为在componentWillMount中可以提前进行异步请求,避免白屏,其实这个观点是有问题的.

由于JavaScript中异步事件的性质，当您启动API调用时，浏览器会在此期间返回执行其他工作。当React渲染一个组件时，它不会等待componentWillMount它完成任何事情 - React继续前进并继续render,没有办法“暂停”渲染以等待数据到达。

而且在componentWillMount请求会有一系列潜在的问题,首先,在服务器渲染时,如果在 componentWillMount 里获取数据，fetch data会执行两次，一次在服务端一次在客户端，这造成了多余的请求,其次,在React 16进行React Fiber重写后,componentWillMount可能在一次渲染中多次调用.

目前官方推荐的异步请求是在componentDidmount中进行.

如果有特殊需求需要提前请求,也可以在特殊情况下在constructor中请求:

## setState到底是异步还是同步?
（https://imweb.io/topic/5b189d04d4c96b9b1b4c4ed6）
(https://github.com/sisterAn/blog/issues/26)

先给出答案: 有时表现出异步,有时表现出同步

setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”。

原因： 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。


## setState为什么要设计成异步的

1. 保证内部的一致性：即使state是同步更新，props也不是。（你只有在父组件重新渲染时才能知道props）
2. 将state的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实dom，那么它将带来巨大的性能消耗。


## React组件通信如何实现?
1. 父组件向子组件通讯: 父组件可以向子组件通过传 props 的方式，向子组件进行通讯
2. 子组件向父组件通讯: props+回调的方式,父组件向子组件传递props进行通讯，此props为作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中
3. 兄弟组件通信: 找到这两个兄弟节点共同的父节点,结合上面两种方式由父节点转发信息进行通信
4. 跨层级通信: Context设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言,对于跨越多层的全局数据通过Context通信再适合不过
5. 发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引入event模块进行通信
6. 全局状态管理工具: 借助Redux或者Mobx等全局状态管理工具进行通信,这种工具会维护一个全局状态中心Store,并根据不同的事件产生新的状态

#### React 事件机制
（https://juejin.im/post/5bd32493f265da0ae472cc8e#heading-3）
（https://toutiao.io/posts/28of14w/preview）

react为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在jsx中常见的onClick、onChange这些都是合成事件。
减少内存消耗，提升性能，不需要注册那么多的事件了，一种事件类型只在 document 上注册一次

统一规范，解决 ie 事件兼容问题，简化事件逻辑

原生事件阻止冒泡肯定会阻止合成事件的触发。
合成事件的阻止冒泡不会影响原生事件。

#### 你是如何理解fiber的?
(https://segmentfault.com/a/1190000018250127)
(http://www.ayqy.net/blog/dive-into-react-fiber/)
(https://libin1991.github.io/2019/07/01/%E7%90%86%E8%A7%A3-React-Fiber-%E6%9E%B6%E6%9E%84/)

在页面元素很多，且需要频繁刷新的场景下，React 15 会出现掉帧的现象。其根本原因，是大量的同步计算任务阻塞了浏览器的 UI 渲染。默认情况下，JS 运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。当我们调用setState更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。

针对这一问题，React 团队从框架层面对 web 页面的运行机制做了优化，得到很好的效果。
解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成。也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。

旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。而Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式是使用了浏览器的requestIdleCallback这一 API。官方的解释是这样的：

window.requestIdleCallback()会在浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这些延迟触发但关键的事件产生影响。函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。

## React如何进行组件/逻辑复用?

#### 高阶组件HOC
高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。
```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
属性代理
```
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }
      this.onNameChange = this.onNameChange.bind(this)
    }
    onNameChange(event) {
      this.setState({
        name: event.target.value
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange
        }
      }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}
```
反向继承
```
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      return super.render()
    }
  }
}
```
#### 渲染属性
一个 render prop 是一个类型为函数的 prop，它让组件知道该渲染什么。术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。

```
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```
## 为何React事件要自己绑定this？

在上面提到的事件处理流程中， React在 document上进行统一的事件分发， dispatchEvent通过循环调用所有层级的事件来模拟事件冒泡和捕获。
在 React源码中，当具体到某一事件处理函数将要调用时，将调用 invokeGuardedCallback方法。
```

function invokeGuardedCallback(name, func, a) {
try {
  func(a);
} catch (x) {
  if (caughtError === null) {
    caughtError = x;
  }
  }
}
```

可见，事件处理函数是直接调用的，并没有指定调用的组件，所以不进行手动绑定的情况下直接获取到的 this是不准确的，所以我们需要手动将当前组件绑定到 this上。

## react-hooks

(https://github.com/brickspert/blog/issues/26)

#### react hooks 解决了什么问题？
React Hooks 要解决的问题是状态共享，是继 render-props 和 higher-order components 之后的第三种状态共享方案，不会产生 JSX 嵌套地狱问题。状态共享可能描述的不恰当，称为状态逻辑复用会更恰当，因为只共享数据处理逻辑，不会共享数据本身。

#### react hooks 的优势
相比其他几种方案，React Hooks 带来的好处不仅是 “更FP，更新粒度更细，代码更清晰”，还有如下三个特性：
1. 多个状态不会产生嵌套，写法还是平铺的（renderProps 可以通过 compose 解决，可不但使用略为繁琐，而且因为强制封装一个新对象而增加了实体数量）。
2. Hooks 可以引用其他 Hooks。
3. 更容易将组件的 UI 与状态分离。

#### 为什么请求放在useEffect里，放在外面和放里面有什么区别？

当useEffect第二个参数是空数组，相当于 componentDidMount,因为依赖一直不变化，callback 不会二次执行。

#### 为什么只能在函数最外层调用 Hook？为什么不要在循环、条件判断或者子函数中调用。

memoizedState 数组是按 hook定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到。

#### 在useEffect里想使用async/await怎么用?
effect hook 要求要么什么都不返回，要么返回一个清理函数。如果需要使用，我们需要在 useEffect 内部，定义一个单独的 async 函数。

#### 谈了谈useLayoutEffect和useEffect具体执行时机

useEffect不会阻塞浏览器的绘制任务，它在页面更新后才会执行。
而useLayoutEffect跟componentDidMount和componentDidUpdate的执行时机一样，会阻塞页面的渲染。如果在里面执行耗时任务的话，页面就会卡顿。useLayoutEffect会保证在页面渲染前执行，也就是说页面渲染出来的是最终的效果。如果使用useEffect，页面很可能因为渲染了 2 次而出现抖动。

#### 写过自定义hook吗？解决了哪些问题。
获取鼠标位置
```
import React, { useState, useEffect } from 'react'

const useMousePosition = () => {
    const [position, setPosition] = useState({x: 0, y: 0 })
    useEffect(() => {
        const updateMouse = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('mousemove', updateMouse)
        return () => {
            document.removeEventListener('mousemove', updateMouse)
        }
    })
    return position
}

export default useMousePosition
```
#### 讲讲React Hooks的闭包陷阱，你是怎么解决的？

（http://blog.dangosky.com/2019/11/16/React-Hook-%E4%B8%AD%E7%9A%84%E9%97%AD%E5%8C%85%E9%99%B7%E9%98%B1/）

产生的原因是因为useEffect 在第一次渲染时获取值为 0 的 value，将不再次执行 effect，所以 setInterval 一直引用第一次渲染时的闭包。即在useEffect中引用的一直是一开始的值。


## 类组件(Class component)和函数式组件(Functional component)之间有何不同
类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态
当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 ‘无状态组件(stateless component)’，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件。


## 在构造函数中调用 super(props) 的目的是什么
在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。


## 使用箭头函数(arrow functions)的优点是什么
作用域安全：在箭头函数之前，每一个新创建的函数都有定义自身的 this 值(在构造函数中是新对象；在严格模式下，函数调用中的 this 是未定义的；如果函数被称为“对象方法”，则为基础对象等)，但箭头函数不会，它会使用封闭执行上下文的 this 值。
简单：箭头函数易于阅读和书写
清晰：当一切都是一个箭头函数，任何常规函数都可以立即用于定义作用域。开发者总是可以查找 next-higher 函数语句，以查看 this 的值

## 区分受控组件和非受控组件
受控组件： 没有维持自己的状态，数据由父组件控制，通过 props 获取当前值，然后通过回调通知更改。在 HTML 中，表单元素如通常维护自己的状态，并根据用户输入进行更新。当用户提交表单时，来自上述元素的值将随表单一起发送。
而 React 的工作方式则不同。包含表单的组件将跟踪其状态中的输入值，并在每次回调函数(例如onChange)触发时重新渲染组件，因为状态被更新。以这种方式由 React 控制其值的输入表单元素称为受控组件。

非受控组件：保持着自己的状态，数据由 DOM 控制，Refs 用于获取其当前值
受控组件是 React 控制中的组件，并且是表单数据真实的唯一来源。
非受控组件是由 DOM 处理表单数据的地方，而不是在 React 组件中。


## React 中的StrictMode(严格模式)是什么？？

React 的StrictMode是一种辅助组件，可以帮助咱们编写更好的 react 组件，可以使用<StrictMode />包装一组组件，并且可以帮咱们以下检查：
验证内部组件是否遵循某些推荐做法，如果没有，会在控制台给出警告。
验证是否使用的已经废弃的方法，如果有，会在控制台给出警告。
通过识别潜在的风险预防一些副作用。


## pureComponent和FunctionComponent区别
（https://juejin.im/entry/5934c9bc570c35005b556e1a）

## 介绍Immuable
（https://github.com/camsong/blog/issues/3）

##  React有哪些优化性能是手段?
性能优化的手段很多时候是通用的详情见前端性能优化加载篇

#### React diff原理

React Diff

（https://zhuanlan.zhihu.com/p/20346379）（https://segmentfault.com/a/1190000017039293）

29. React挂载的时候有3个组件，textComponent、composeComponent、domComponent，区别和关系，Dom结构发生变化时怎么区分data的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
30. key主要是解决哪一类的问题，为什么不建议用索引index（重绘）
30. Redux中异步的请求怎么处理
31. state是怎么注入到组件的，从reducer到组件经历了什么样的过程