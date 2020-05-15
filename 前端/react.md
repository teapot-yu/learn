## React
#### 为什么选择使用框架而不是原生?
组件化: 其中以 React 的组件化最为彻底,甚至可以到函数级别的原子组件,高度的组件化可以是我们的工程易于维护、易于组合拓展。
天然分层: JQuery 时代的代码大部分情况下是面条代码,耦合严重,现代框架不管是 MVC、MVP还是MVVM 模式都能帮助我们进行分层，代码解耦更易于读写。
生态: 现在主流前端框架都自带生态,不管是数据流管理架构还是 UI 库都有成熟的解决方案。
开发效率: 现代前端框架都默认自动更新DOM,而非我们手动操作,解放了开发者的手动DOM成本,提高开发效率,从根本上解决了UI 与状态同步问题.

#### React 的工作原理
React 会创建一个虚拟 DOM(virtual DOM)。当一个组件中的状态改变时，React 首先会通过 “diffing” 算法来标记虚拟 DOM 中的改变，第二步是调节(reconciliation)，会用 diff 的结果来更新 DOM。

####什么是JSX
JSX 是J avaScript XML 的简写。是 React 使用的一种文件，它利用 JavaScript 的表现力和类似 HTML 的模板语法。这使得 HTML 文件非常容易理解。此文件能使应用非常可靠，并能够提高其性能。


####  虚拟DOM的优劣如何
优点:

保证性能下限: 虚拟DOM可以经过diff找出最小差异,然后批量进行patch,这种操作虽然比不上手动优化,但是比起粗暴的DOM操作性能要好很多,因此虚拟DOM可以保证性能下限
无需手动操作DOM: 虚拟DOM的diff和patch都是在一次更新中自动进行的,我们无需手动操作DOM,极大提高开发效率
跨平台: 虚拟DOM本质上是JavaScript对象,而DOM与平台强相关,相比之下虚拟DOM可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等

缺点:

无法进行极致优化: 在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化,比如VScode采用直接手动操作DOM的方式进行极端的性能优化


#### 虚拟DOM实现原理?
 在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，结果仅仅是轻量级的 JavaScript 对象，我们称之为 virtual DOM。
虚拟 DOM 是 React 的一大亮点，具有 batching(批处理) 和高效的 Diff 算法。这让我们可以无需担心性能问题而” 毫无顾忌” 的随时“ 刷新” 整个页面，由虚拟 DOM 来确保只对界面上真正变化的部分进行实际的 DOM 操作。
React 从来没有说过 “React 比原生操作 DOM 快”。React 给我们的保证是，在不需要手动优化的情况下，它依然可以给我们提供过得去的性能。
React 掩盖了底层的 DOM 操作，可以用更声明式的方式来描述我们目的，从而让代码更容易维护。下面还是借鉴了知乎上的回答：没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。
简单总结来说虚拟DOM本质上是JavaScript对象,是对真实DOM的抽象
状态变更时，记录新树和旧树的差异
最后把差异更新到真正的dom中

#### 当渲染一个列表时，何为 key？设置 key 的目的是什么
Keys 会有助于 React 识别哪些 items 改变了，被添加了或者被移除了。Keys 应该被赋予数组内的元素以赋予(DOM)元素一个稳定的标识，选择一个 key 的最佳方法是使用一个字符串，该字符串能惟一地标识一个列表项。很多时候你会使用数据中的 IDs 作为 keys，当你没有稳定的 IDs 用于被渲染的 items 时，可以使用项目索引作为渲染项的 key，但这种方式并不推荐，如果 items 可以重新排序，就会导致 re-render 变慢。

#### React最新的生命周期是怎样的?
React 16之后有三个生命周期被废弃(但并未删除)

componentWillMount
componentWillReceiveProps
componentWillUpdate
官方计划在17版本完全删除这三个函数，只保留UNSAVE_前缀的三个函数，目的是为了向下兼容，但是对于开发者而言应该尽量避免使用他们，而是使用新增的生命周期函数替代它们

目前React 16.8 +的生命周期分为三个阶段,分别是挂载阶段、更新阶段、卸载阶段

挂载阶段:

constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this
getDerivedStateFromProps: static getDerivedStateFromProps(nextProps, prevState),这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps
render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容
componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅
更新阶段:

getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用
shouldComponentUpdate: shouldComponentUpdate(nextProps, nextState),有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能
render: 更新阶段也会触发此生命周期
getSnapshotBeforeUpdate: getSnapshotBeforeUpdate(prevProps, prevState),这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用
componentDidUpdate: componentDidUpdate(prevProps, prevState, snapshot),该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。
卸载阶段:

componentWillUnmount: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

#### React的请求应该放在哪个生命周期中?
React的异步请求到底应该放在哪个生命周期里,有人认为在componentWillMount中可以提前进行异步请求,避免白屏,其实这个观点是有问题的.

由于JavaScript中异步事件的性质，当您启动API调用时，浏览器会在此期间返回执行其他工作。当React渲染一个组件时，它不会等待componentWillMount它完成任何事情 - React继续前进并继续render,没有办法“暂停”渲染以等待数据到达。

而且在componentWillMount请求会有一系列潜在的问题,首先,在服务器渲染时,如果在 componentWillMount 里获取数据，fetch data会执行两次，一次在服务端一次在客户端，这造成了多余的请求,其次,在React 16进行React Fiber重写后,componentWillMount可能在一次渲染中多次调用.

目前官方推荐的异步请求是在componentDidmount中进行.

如果有特殊需求需要提前请求,也可以在特殊情况下在constructor中请求:

#### setState到底是异步还是同步?
（https://imweb.io/topic/5b189d04d4c96b9b1b4c4ed6）
(https://github.com/sisterAn/blog/issues/26)
先给出答案: 有时表现出异步,有时表现出同步

setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。

在ReactDefaultBatchingStrategy类中，isBatchingUpdates 字段用于标记当前是否处于批量更新而batchedUpdates:当调用这个方法时，正式开始批量更新，并更新字段名。
setState具体流程为，当调用setState方法时会先获取当前组件实例，检查当前组件的是否处于批量更新的状态即isBatchingUpdates，如果是则将组件放入队列中，否则调用batchedUpdates批量更新方法。

在React中，如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

原因： 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

注意： setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

#### setState为什么要设计成异步的
保证内部的一致性：即使state是同步更新，props也不是。（你只有在父组件重新渲染时才能知道props）
将state的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实dom，那么它将带来巨大的性能消耗。


#### React组件通信如何实现?
父组件向子组件通讯: 父组件可以向子组件通过传 props 的方式，向子组件进行通讯
子组件向父组件通讯: props+回调的方式,父组件向子组件传递props进行通讯，此props为作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中
兄弟组件通信: 找到这两个兄弟节点共同的父节点,结合上面两种方式由父节点转发信息进行通信
跨层级通信: Context设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言,对于跨越多层的全局数据通过Context通信再适合不过
发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引入event模块进行通信
全局状态管理工具: 借助Redux或者Mobx等全局状态管理工具进行通信,这种工具会维护一个全局状态中心Store,并根据不同的事件产生新的状态

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

#### React如何进行组件/逻辑复用?
高阶组件HOC
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
渲染属性
一个 render prop 是一个类型为函数的 prop，它让组件知道该渲染什么。术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。

```
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```
#### 为何React事件要自己绑定this？

在上面提到的事件处理流程中， React在 document上进行统一的事件分发， dispatchEvent通过循环调用所有层级的事件来模拟事件冒泡和捕获。
在 React源码中，当具体到某一事件处理函数将要调用时，将调用 invokeGuardedCallback方法。

function invokeGuardedCallback(name, func, a) {
try {
    func(a);
} catch (x) {
if (caughtError === null) {
      caughtError = x;
}
}
}

可见，事件处理函数是直接调用的，并没有指定调用的组件，所以不进行手动绑定的情况下直接获取到的 this是不准确的，所以我们需要手动将当前组件绑定到 this上。

#### react-hooks
1. react hooks 解决了什么问题？
React Hooks 要解决的问题是状态共享，是继 render-props 和 higher-order components 之后的第三种状态共享方案，不会产生 JSX 嵌套地狱问题。状态共享可能描述的不恰当，称为状态逻辑复用会更恰当，因为只共享数据处理逻辑，不会共享数据本身。
相比其他几种方案，React Hooks 带来的好处不仅是 “更FP，更新粒度更细，代码更清晰”，还有如下三个特性：
多个状态不会产生嵌套，写法还是平铺的（renderProps 可以通过 compose 解决，可不但使用略为繁琐，而且因为强制封装一个新对象而增加了实体数量）。
Hooks 可以引用其他 Hooks。
更容易将组件的 UI 与状态分离。

2. 为什么请求放在useEffect里，放在外面和放里面有什么区别？在useEffect里想使用async/await怎么用

3. 谈了谈useLayoutEffect和useEffect具体执行时机

4. 如何使用hook在依赖改变的时候重新发送请求？
5. 写过自定义hook吗？解决了哪些问题。
6. 讲讲React Hooks的闭包陷阱，你是怎么解决的？



#### 类组件(Class component)和函数式组件(Functional component)之间有何不同
类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态
当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 ‘无状态组件(stateless component)’，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件。


#### 在构造函数中调用 super(props) 的目的是什么
在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。



#### 使用箭头函数(arrow functions)的优点是什么
作用域安全：在箭头函数之前，每一个新创建的函数都有定义自身的 this 值(在构造函数中是新对象；在严格模式下，函数调用中的 this 是未定义的；如果函数被称为“对象方法”，则为基础对象等)，但箭头函数不会，它会使用封闭执行上下文的 this 值。
简单：箭头函数易于阅读和书写
清晰：当一切都是一个箭头函数，任何常规函数都可以立即用于定义作用域。开发者总是可以查找 next-higher 函数语句，以查看 this 的值

#### 区分受控组件和非受控组件
受控组件： 没有维持自己的状态，数据由父组件控制，通过 props 获取当前值，然后通过回调通知更改。在 HTML 中，表单元素如通常维护自己的状态，并根据用户输入进行更新。当用户提交表单时，来自上述元素的值将随表单一起发送。
而 React 的工作方式则不同。包含表单的组件将跟踪其状态中的输入值，并在每次回调函数(例如onChange)触发时重新渲染组件，因为状态被更新。以这种方式由 React 控制其值的输入表单元素称为受控组件。

非受控组件：保持着自己的状态，数据由 DOM 控制，Refs 用于获取其当前值
受控组件是 React 控制中的组件，并且是表单数据真实的唯一来源。
非受控组件是由 DOM 处理表单数据的地方，而不是在 React 组件中。

### 什么是纯组件？
纯（Pure） 组件是可以编写的最简单、最快的组件。它们可以替换任何只有 render() 的组件。这些组件增强了代码的简单性和应用的性能。

#### React 中的StrictMode(严格模式)是什么？？

React 的StrictMode是一种辅助组件，可以帮助咱们编写更好的 react 组件，可以使用<StrictMode />包装一组组件，并且可以帮咱们以下检查：
验证内部组件是否遵循某些推荐做法，如果没有，会在控制台给出警告。
验证是否使用的已经废弃的方法，如果有，会在控制台给出警告。
通过识别潜在的风险预防一些副作用。


#### pureComponent和FunctionComponent区别

#### 介绍Immuable



###  React有哪些优化性能是手段?
性能优化的手段很多时候是通用的详情见前端性能优化加载篇

#### import { Button } from 'antd'，打包的时候只打包button，分模块加载，是怎么做到的

#### 使用import时，webpack对node_modules里的依赖会做什么

#### 介绍纯函数





## Redux

#### redux的工作流程?
首先，我们看下几个核心概念：

Store：保存数据的地方，你可以把它看成一个容器，整个应用只能有一个Store。
State：Store对象包含所有数据，如果想得到某个时点的数据，就要对Store生成快照，这种时点的数据集合，就叫做State。
Action：State的变化，会导致View的变化。但是，用户接触不到State，只能接触到View。所以，State的变化必须是View导致的。Action就是View发出的通知，表示State应该要发生变化了。
Action Creator：View要发送多少种消息，就会有多少种Action。如果都手写，会很麻烦，所以我们定义一个函数来生成Action，这个函数就叫Action Creator。
Reducer：Store收到Action以后，必须给出一个新的State，这样View才会发生变化。这种State的计算过程就叫做Reducer。Reducer是一个函数，它接受Action和当前State作为参数，返回一个新的State。
dispatch：是View发出Action的唯一方法。

然后我们过下整个工作流程：

首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。
然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State
State一旦有变化，Store就会调用监听函数，来更新View。

到这儿为止，一次用户交互流程结束。可以看到，在整个流程中数据都是单向流动的，这种方式保证了流程的清晰。


#### react-redux是如何工作的?

Provider: Provider的作用是从最外部封装了整个应用，并向connect模块传递store
connect: 负责连接React和Redux

获取state: connect通过context获取Provider中的store，通过store.getState()获取整个store tree 上所有state
包装原组件: 将state和action通过props的方式传入到原组件内部wrapWithConnect返回一个ReactComponent对象Connect，Connect重新render外部传入的原组件WrappedComponent，并把connect中传入的mapStateToProps, mapDispatchToProps与组件上原有的props合并后，通过属性的方式传给WrappedComponent
监听store tree变化: connect缓存了store tree中state的状态,通过当前state状态和变更前state状态进行比较,从而确定是否调用this.setState()方法触发Connect及其子组件的重新渲染


#### redux与mobx的区别?
两者对比:

redux将数据保存在单一的store中，mobx将数据保存在分散的多个store中
redux使用plain object保存数据，需要手动处理变化后的操作；mobx适用observable保存数据，数据变化后自动处理响应的操作
redux使用不可变状态，这意味着状态是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数；mobx中的状态是可变的，可以直接对其进行修改
mobx相对来说比较简单，在其中有很多的抽象，mobx更多的使用面向对象的编程思维；redux会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用
mobx中有更多的抽象和封装，调试会比较困难，同时结果也难以预测；而redux提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

场景辨析:
基于以上区别,我们可以简单得分析一下两者的不同使用场景.
mobx更适合数据不复杂的应用: mobx难以调试,很多状态无法回溯,面对复杂度高的应用时,往往力不从心.
redux适合有回溯需求的应用: 比如一个画板应用、一个表格应用，很多时候需要撤销、重做等操作，由于redux不可变的特性，天然支持这些操作.
mobx适合短平快的项目: mobx上手简单,样板代码少,可以很大程度上提高开发效率.
当然mobx和redux也并不一定是非此即彼的关系,你也可以在项目中用redux作为全局状态管理,用mobx作为组件局部状态管理器来用.

####  redux中如何进行异步操作?
当然,我们可以在componentDidmount中直接进行请求无须借助redux.
但是在一定规模的项目中,上述方法很难进行异步流的管理,通常情况下我们会借助redux的异步中间件进行异步处理.
redux异步流中间件其实有很多,但是当下主流的异步中间件只有两种redux-thunk、redux-saga，当然redux-observable可能也有资格占据一席之地,其余的异步中间件不管是社区活跃度还是npm下载量都比较差了.
redux异步中间件之间的优劣?
redux-thunk优点:

体积小: redux-thunk的实现方式很简单,只有不到20行代码
使用简单: redux-thunk没有引入像redux-saga或者redux-observable额外的范式,上手简单

redux-thunk缺陷:

样板代码过多: 与redux本身一样,通常一个请求需要大量的代码,而且很多都是重复性质的
耦合严重: 异步操作与redux的action偶合在一起,不方便管理
功能孱弱: 有一些实际开发中常用的功能需要自己进行封装

redux-saga优点:

异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中
action摆脱thunk function: dispatch 的参数依然是一个纯粹的 action (FSA)，而不是充满 “黑魔法” thunk function
异常处理: 受益于 generator function 的 saga 实现，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理
功能强大: redux-saga提供了大量的Saga 辅助函数和Effect 创建器供开发者使用,开发者无须封装或者简单封装即可使用
灵活: redux-saga可以将多个Saga可以串行/并行组合起来,形成一个非常实用的异步flow
易测试，提供了各种case的测试方案，包括mock task，分支覆盖等等

redux-saga缺陷:

额外的学习成本: redux-saga不仅在使用难以理解的 generator function,而且有数十个API,学习成本远超redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与redux-observable不同,redux-observable虽然也有额外学习成本但是背后是rxjs和一整套思想
体积庞大: 体积略大,代码近2000行，min版25KB左右
功能过剩: 实际上并发控制等功能很难用到,但是我们依然需要引入这些代码
ts支持不友好: yield无法返回TS类型

redux-observable优点:

功能最强: 由于背靠rxjs这个强大的响应式编程的库,借助rxjs的操作符,你可以几乎做任何你能想到的异步处理
背靠rxjs: 由于有rxjs的加持,如果你已经学习了rxjs,redux-observable的学习成本并不高,而且随着rxjs的升级redux-observable也会变得更强大

redux-observable缺陷:

学习成本奇高: 如果你不会rxjs,则需要额外学习两个复杂的库
社区一般: redux-observable的下载量只有redux-saga的1/5,社区也不够活跃,在复杂异步流中间件这个层面redux-saga仍处于领导地位

#### reducer中为什么不能做异步操作

#### connect原理

#### MVC框架的主要问题是什么？
1. 对 DOM 操作的代价非常高
2. 程序运行缓慢且效率低下
3. 内存浪费严重
4. 由于循环依赖性，组件模型需要围绕 models 和 views 进行创建

#### 解释一下 Flux
Flux 是一种强制单向数据流的架构模式。它控制派生数据，并使用具有所有数据权限的中心 store 实现多个组件之间的通

#### 什么是Redux？
Redux 是当今最热门的前端开发库之一。它是 JavaScript 程序的可预测状态容器，用于整个应用的状态管理。使用 Redux 开发的应用易于测试，可以在不同环境中运行，并显示一致的行为。

#### Redux遵循的三个原则是什么？

1. 单一事实来源：整个应用的状态存储在单个 store 中的对象/状态树里。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。
2. 状态是只读的：改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。
3. 使用纯函数进行更改：为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。

#### 你对“单一事实来源”有什么理解？
Redux 使用 “Store” 将程序的整个状态存储在同一个地方。因此所有组件的状态都存储在 Store 中，并且它们从 Store 本身接收更新。单一状态树可以更容易地跟踪随时间的变化，并调试或检查程序。

#### 列出 Redux 的组件。
Redux 由以下组件组成：

Action – 这是一个用来描述发生了什么事情的对象。
Reducer –  这是一个确定状态将如何变化的地方。
Store – 整个程序的状态/对象树保存在Store中。
View – 只显示 Store 提供的数据。

#### 数据如何通过 Redux 流动？

#### 如何在 Redux 中定义 Action？
React 中的 Action 必须具有 type 属性，该属性指示正在执行的 ACTION 的类型。必须将它们定义为字符串常量，并且还可以向其添加更多的属性。在 Redux 中，action 被名为 Action Creators 的函数所创建。以下是 Action 和Action Creator 的示例：
function addTodo(text) {
       return {
                type: ADD_TODO,
                 text
    }
}
复制代码42. 解释 Reducer 的作用。
Reducers 是纯函数，它规定应用程序的状态怎样因响应 ACTION 而改变。Reducers 通过接受先前的状态和 action 来工作，然后它返回一个新的状态。它根据操作的类型确定需要执行哪种更新，然后返回新的值。如果不需要完成任务，它会返回原来的状态。

#### Store 在 Redux 中的意义是什么？
Store 是一个 JavaScript 对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器。应用程序的整个状态/对象树保存在单一存储中。因此，Redux 非常简单且是可预测的。我们可以将中间件传递到 store 来处理数据，并记录改变存储状态的各种操作。所有操作都通过 reducer 返回一个新状态。

## React Router

#### 什么是React 路由？
React 路由是一个构建在 React 之上的强大的路由库，它有助于向应用程序添加新的屏幕和流。这使 URL 与网页上显示的数据保持同步。它负责维护标准化的结构和行为，并用于开发单页 Web 应用。 React 路由有一个简单的API。

#### 为什么React Router v4中使用 switch 关键字 ？
虽然 <div> ** 用于封装 Router 中的多个路由，当你想要仅显示要在多个定义的路线中呈现的单个路线时，可以使用 “switch” 关键字。使用时，<switch>**  标记会按顺序将已定义的 URL 与已定义的路由进行匹配。找到第一个匹配项后，它将渲染指定的路径。从而绕过其它路线。

#### 为什么需要 React 中的路由？
Router 用于定义多个路由，当用户定义特定的 URL 时，如果此 URL 与 Router 内定义的任何 “路由” 的路径匹配，则用户将重定向到该特定路由。所以基本上我们需要在自己的应用中添加一个 Router 库，允许创建多个路由，每个路由都会向我们提供一个独特的视图
<switch>
    <route exact path=’/’ component={Home}/>
    <route path=’/posts/:id’ component={Newpost}/>
    <route path=’/posts’   component={Post}/>
</switch>
复制代码49. 列出 React Router 的优点。
几个优点是：

就像 React 基于组件一样，在 React Router v4 中，API 是 'All About Components'。可以将 Router 可视化为单个根组件（<BrowserRouter>），其中我们将特定的子路由（<route>）包起来。
无需手动设置历史值：在 React Router v4 中，我们要做的就是将路由包装在 <BrowserRouter> 组件中。
包是分开的：共有三个包，分别用于 Web、Native 和 Core。这使我们应用更加紧凑。基于类似的编码风格很容易进行切换。































React Diff（https://zhuanlan.zhihu.com/p/20346379）（https://segmentfault.com/a/1190000017039293）
React Filber （https://segmentfault.com/a/1190000018250127）
react hooks(https://github.com/brickspert/blog/issues/26)(https://juejin.im/post/5daee8b7e51d4524ce222825)