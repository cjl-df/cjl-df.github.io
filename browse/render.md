### 1.渲染引擎

- 分类：不同浏览器用不同渲染引擎。

        Internet Explorer uses Trident, Firefox uses Gecko, Safari uses WebKit.
        Chrome and Opera (from version 15) use Blink, a fork of WebKit.
        WebKit 是一个开源渲染引擎，起初作为Linux platform的引擎，后被 Apple应用于Mac.
        详见 webkit.org.

* 加载：

        1. 浏览器根据 DNS 服务器得到域名的 IP 地址

        2. 向这个 IP 的机器发送 HTTP 请求

        3. 服务器收到、处理并返回 HTTP 请求

        4. 浏览器得到返回内容

### 2.渲染

_浏览器对请求的呈现。默认渲染引擎可以呈现 html，xml 及图片。（通过插件）也可以呈现其它数据，比如 pdf 等。 目前只考虑 html 和 css 方面。_

- 渲染流程

    - 解析 html 建立 dom 树

    - 解析 css 构建 render 树（将 CSS 代码解析成树形的数据结构，然后结合 DOM 合并成 render 树),也就是将 css 解析成 CSSOM

    - 布局 render 树（Layout/reflow），负责各元素尺寸、位置的计算

    - 绘制 render 树（paint），绘制页面像素信息

    - 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（composite），显示在屏幕上

- 浏览器拿到了 server 端返回的 HTML 内容后，开始解析并渲染。最初拿到的内容就是一堆字符串，必须先结构
  化成计算机擅长处理的基本数据结构--- DOM 树 (最基本的数据结构之一)。
  解析过程中，如果遇到`<link href="...">`和`<script src="...">`这种外链加载 CSS 和 JS 的标签，
  浏览器会异步下载，下载过程和上文中下载 HTML 的流程一样。只不过，这里下载下来的字符串是 CSS 或者 JS 格式的。

  所有详细步骤都已经略去，渲染完毕后就是 load 事件了

- 流程如下图：

![渲染基本流程](../assets/image/browser-flow.png)

![浏览器渲染引擎架构图](../assets/image/browser-renderDetail.png)

### 3.渲染流程阻塞

_常把 css 放在头部（保证渲染），把 js 放在底部（保证非阻塞）。_

- css 阻塞:默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM
  *构建完毕。请务必精简您的 CSS，尽快提供它，并利用媒体类型和查询来解除对渲染的阻塞。\*

-  **link 标签： 单独的下载线程异步下载的，不会阻塞 dom 解析的，但是会阻塞 paint 绘制 render 树，**
  **(当然如果是样式表也会阻塞 cssom)**

-  **script 标签： 肯定是会阻塞 dom 解析的，假如浏览器遇到它，会下载 它并执行里面的内容，才去继续解析下面的 dom，**
  **解决办法有两个，一是在 script 标签上加上 async 或 defer,一是使用 createElement 动态创建 script;**
  **关于 scrip 标签具体如下**

    - Normal execution `<script>`

            浏览器默认：当执行script时解析html代码暂停。
            对于慢服务和重script的情况意味着webpage呈现将被延后。

    - Deferred execution `<script defer>`

            简而言之：推迟script执行直到html解析结束。该属性的好处就是DOM渲染友好，对于你的script。
            然而，并非每个浏览器支持该属性，故不要指望它！

    - Asynchronous execution `<script async>`

            不用管script何时好？async对于两个都是最好的：html解析可能持续且script将被执行一旦ready。
            对script标签推荐这个属性，如google analytics所分析。

### 4.load 事件与 DOMContentLoaded 事件的先后

_上面提到，渲染完毕后会触发 load 事件，那么你能分清楚 load 事件与 DOMContentLoaded 事件的先后么？_
_很简单，知道它们的定义就可以了：_

- 当 DOMContentLoaded 事件触发时，仅当 DOM 加载完成，不包括样式表，图片。
  (譬如如果有 async 加载的脚本就不一定完成)

- 当 onload 事件触发时，页面上所有的 DOM，样式表，脚本，图片都已经加载完成了。
  （渲染完毕了）

- **所以，顺序是：DOMContentLoaded -> load**

### 5.浏览器重绘(repaint)重排(reflow)与优化[浏览器机制]

- 渲染

  网页生成的时候，至少会渲染一次。
  在用户访问的过程中，还会不断重新渲染
  重新渲染需要重复之前的第三步(重新生成布局)+第五步(重新绘制)或者只有第四个步(重新绘制)。

  重排一定会重绘；重绘不一定重排

- 重排

    - 概念

            当DOM的变化影响了元素的几何信息(DOM对象的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，
            将其安放在界面中的正确位置，这个过程叫做重排。

            重排也叫回流,重排的过程以下面这种理解方式更清晰一些：回流就好比向河里(文档流)扔了一块石头
            (dom变化)，激起涟漪，然后引起周边水流受到波及，所以叫做回流

    - 常见引起重排属性和方法

        任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发重排，下面列一些栗子：

            1. 添加或者删除可见的DOM元素；
            2. 元素尺寸改变——边距、填充、边框、宽度和高度
            3. 内容变化，比如用户在input框中输入文字
            4. 浏览器窗口尺寸改变——resize事件发生时
            5. 计算 offsetWidth 和 offsetHeight 属性
            6. 设置 style 属性的值

        |修改属性|读取修改属性|方法|
        |----|----|----|
        |width，height，margin，padding，display，border， position，overflow|clientWidth，clientHeight，clientTop，clientLeft，clientWidth，clientHeight，clientTop，clientLeft，offsetWidth，offsetHeight，offsetTop，offsetLeft，scrollWidth，scrollHeight，scrollTop，scrollLeft|scrollIntoView()，scrollTo()，getComputedStyle()，getBoundingClientRect()，scrollIntoViewIfNeeded()


    - 重排影响的范围：
   
        - 由于浏览器渲染界面是基于流失布局模型的，所以触发重排时会对周围DOM重新排列，影响的范围有两种：

                全局范围：从根节点html开始对整个渲染树进行重新布局。
                
                局部范围：对渲染树的某部分或某一个渲染对象进行重局；局部布局来解释这种现象，
                把一个dom的宽高之类的几何信息定死，然后在dom内部触发重排，就只会重新渲染该dom
                内部的元素，而不会影响到外界


        - 尽可能的减少重排的次数、重排范围：
            
                重排需要更新渲染树,性能花销非常大:
                它们的代价是高昂的，会破坏用户体验，并且让UI展示非常迟缓，
                我们需要尽可能的减少触发重排的次数。
                重排的性能花销跟渲染树有多少节点需要重新构建有关系：
                所以我们应该尽量以局部布局的形式组织html结构，尽可能小的影响重排的范围。
                而不是像全局范围的示例代码一样一溜的堆砌标签，
                随便一个元素触发重排都会导致全局范围的重排。
