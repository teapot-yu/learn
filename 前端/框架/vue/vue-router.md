
## 什么是路由懒加载？其原理是什么？

（https://www.jqhtml.com/59114.html）


## 前端路由实现

路由这个概念最先是后端出现的。在以前用模板引擎开发页面时，经常会看到这样
http://hometown.xxx.edu.cn/bbs/forum.php
有时还会有带.asp或.html的路径，这就是所谓的SSR(Server Side Render)，通过服务端渲染，直接返回页面。
其响应过程是这样的
1.浏览器发出请求
2.服务器监听到80端口（或443）有请求过来，并解析url路径
3.根据服务器的路由配置，返回相应信息（可以是 html 字串，也可以是 json 数据，图片等）
4.浏览器根据数据包的Content-Type来决定如何解析数据

简单来说路由就是用来跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源，请求不同的页面是路由的其中一种功能。

前端路由的诞生的缘由
前端路由的出现要从 ajax 开始，为什么？且听下面分析 (ˉ▽￣～)

Ajax，全称 Asynchronous JavaScript And XML，是浏览器用来实现异步加载的一种技术方案。在 90s 年代初，大多数的网页都是通过直接返回 HTML 的，用户的每次更新操作都需要重新刷新页面。及其影响交互体验，随着网络的发展，迫切需要一种方案来改善这种情况。

1996，微软首先提出 iframe 标签，iframe 带来了异步加载和请求元素的概念，随后在 1998 年，微软的 Outloook Web App 团队提出 Ajax 的基本概念（XMLHttpRequest的前身），并在 IE5 通过 ActiveX 来实现了这项技术。在微软实现这个概念后，其他浏览器比如 Mozilia，Safari，Opera 相继以 XMLHttpRequest 来实现 Ajax。（? 兼容问题从此出现，话说微软命名真喜欢用X，MFC源码一大堆。。）不过在 IE7 发布时，微软选择了妥协，兼容了 XMLHttpRequest 的实现。
[vue router hash源码]（https://github.com/vuejs/vue-router/blob/dev/src/history/hash.js#L22-L54）

有了 Ajax 后，用户交互就不用每次都刷新页面，体验带来了极大的提升。

但真正让这项技术发扬光大的，还是后来的 Google Map，它的出现向人们展现了 Ajax 的真正魅力，释放了众多开发人员的想象力，让其不仅仅局限于简单的数据和页面交互，为后来异步交互体验方式的繁荣发展带来了根基。

而异步交互体验的更高级版本就是 SPA（那么问个问题，异步交互最高级的体验是什么？会在文末揭晓）—— 单页应用。单页应用不仅仅是在页面交互是无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。

单页应用的概念是伴随着 MVVM 出现的。最早由微软提出，然后他们在浏览器端用 Knockoutjs 实现。但这项技术的强大之处并未当时的开发者体会到，可能是因为 Knockoutjs 实现过于复杂，导致没有大面积的扩散。

同样，这次接力的选手依然是 Google。Google 通过 Angularjs 将 MVVM 及单页应用发扬光大，让前端开发者能够开发出更加大型的应用，职能变得更大了。（不得不感慨，微软 跟 Google 都是伟大的公司）。随后都是大家都知道的故事，前端圈开始得到了爆发式的发展，陆续出现了很多优秀的框架。

从 vue-router 来看前端路由实现原理
前端路由的实现其实很简单。
[h5 history解读](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

本质上就是检测 url 的变化，截获 url 地址，然后解析来匹配路由规则。

但是这样有人就会问：url 每次变化都会刷新页面啊？页面都刷新了，JavaScript 怎么检测和截获 url？

在 2014 年之前，大家是通过 hash 来实现路由，url hash 就是类似于

https://segmentfault.com/a/1190000011956628#articleHeader2

这种 #。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发 hashchange 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。

让我们来整理思路，假如我们要用 hash 的模式实现一个路由，那么流程应该是这样的。
![avatar](../image/hash-router.png)

hash-mode

hash 的实现相对来说要简单方便些，而且不用服务器来支持。

另外我们可以参考参考 vue-router 这一部分的实现（为了便于解释我简化了部分代码）

vue-router hash 实现源码地址

```
/**
 * 添加 url hash 变化的监听器
 */
setupListeners () {
  const router = this.router

  /**
   * 每当 hash 变化时就解析路径
   * 匹配路由
   */
  window.addEventListener('hashchange', () => {
    const current = this.current
    /**
     * transitionTo:
     * 匹配路由
     * 并通过路由配置，把新的页面 render 到 ui-view 的节点
     */
    this.transitionTo(getHash(), route => {
      replaceHash(route.fullPath)
    })
  })
}
```
检测到 hash 的变化后，就可以通过替换 DOM 的方式来实现页面的更换。

14年后，因为HTML5标准发布。多了两个 API，pushState 和 replaceState，通过这两个 API 可以改变 url 地址且不会发送请求。同时还有 onpopstate 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。具体可以见：HTML5 histroy 模式

同样，我们来理清下思路，这样写起代码才更得心应手~
![avatar](../image/history-router.png)
html5-mode

这部分 vue-router 的源码，可以发现实现的思路大体也是相同的
[history router源码](https://github.com/vuejs/vue-router/blob/dev/src/history/html5.js)
```
export class HTML5History extends History {
  constructor (router, base) {
    super(router, base)
    /**
     * 原理还是跟 hash 实现一样
     * 通过监听 popstate 事件
     * 匹配路由，然后更新页面 DOM
     */
    window.addEventListener('popstate', e => {
      const current = this.current

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      const location = getLocation(this.base)
      if (this.current === START && location === initLocation) {
        return
      }

      this.transitionTo(location, route => {
        if (supportsScroll) {
          handleScroll(router, route, current, true)
        }
      })
    })
  }
```

## vue-router导航守卫有哪些？
导航主要有三类钩子:
全局级路由钩子、
路由级路由钩子、
组件级路由钩子。主要参数有to(目标路由对象)、from(当前路由对象)、next(是一个函数，用于控制是否放行，即是否能通过当前守卫)。

全局级路由钩子: beforeEach和afterEach，每次路由跳转全局路由钩子都会执行，beforeEach(to, from, next)钩子有三个参数，但是afterEach是已经跳转结束了，所以其没有next参数，afterEach(to, from)，全局路由钩子由router对象调用。
路由级路由钩子: 路由级钩子只有一个即beforeEnter，其是在配置路由表的时候配置，也是有to、from、next三个参数，只有进入该路由的时候才会执行，如果是动态路由之间的切换，那么则不会触发beforeEnter钩子，因为是同一个路由，只是参数不一样。
组件级路由钩子: beforeRouteEnter(路由进入该组件的时候执行)、beforeRouteUpdate(动态路由切换时候执行)、beforeRouteLeave(路由离开当前组件的时候执行)，需要注意的是，路由钩子是优先于组件的生命周期的，也就是说路由钩子全部执行完毕之后才会开始组件的生命周期，所以其钩子执行顺序: beforeRouteLeave –> beforeEach –> beforeEnter –> beforeRouteEnter –> afterEach –> beforeCreate –> created –> mounted，beforeRouteUpdate只有动态路由切换的时候才会执行，即/user/1切换到/user/2才会执行。
