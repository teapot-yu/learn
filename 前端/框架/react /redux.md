
## redux的工作流程?
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


## react-redux是如何工作的?

Provider: Provider的作用是从最外部封装了整个应用，并向connect模块传递store
connect: 负责连接React和Redux
获取state: connect通过context获取Provider中的store，通过store.getState()获取整个store tree 上所有state
包装原组件: 将state和action通过props的方式传入到原组件内部wrapWithConnect返回一个ReactComponent对象Connect，Connect重新render外部传入的原组件WrappedComponent，并把connect中传入的mapStateToProps, mapDispatchToProps与组件上原有的props合并后，通过属性的方式传给WrappedComponent
监听store tree变化: connect缓存了store tree中state的状态,通过当前state状态和变更前state状态进行比较,从而确定是否调用this.setState()方法触发Connect及其子组件的重新渲染


## redux与mobx的区别?
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

##  redux中如何进行异步操作?
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