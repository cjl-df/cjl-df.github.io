### 1.渲染引擎

  * 分类：不同浏览器用不同渲染引擎。
  
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
  
   *浏览器对请求的呈现。默认渲染引擎可以呈现html，xml及图片。（通过插件）也可以呈现其它数据，比如pdf等。 目前只考虑html和css方面。*
   
   * 渲染流程
   
     * 解析html建立dom树
    
     * 解析css构建render树（将CSS代码解析成树形的数据结构，然后结合DOM合并成render树),也就是将css解析成CSSOM
     
     * 布局render树（Layout/reflow），负责各元素尺寸、位置的计算
   
     * 绘制render树（paint），绘制页面像素信息
   
     * 浏览器会将各层的信息发送给GPU，GPU会将各层合成（composite），显示在屏幕上

   * 浏览器拿到了 server 端返回的 HTML 内容后，开始解析并渲染。最初拿到的内容就是一堆字符串，必须先结构
      化成计算机擅长处理的基本数据结构--- DOM 树 (最基本的数据结构之一)。
      解析过程中，如果遇到`<link href="...">`和`<script src="...">`这种外链加载 CSS 和 JS 的标签，
      浏览器会异步下载，下载过程和上文中下载 HTML 的流程一样。只不过，这里下载下来的字符串是 CSS 或者 JS 格式的。

      所有详细步骤都已经略去，渲染完毕后就是load事件了


    * 流程如下图：

      ![渲染基本流程](../assets/image/browser-flow.png)

      ![浏览器渲染引擎架构图](../assets/image/browser-renderDetail.png)
    
  * 渲染流程阻塞
     
    *常把css放在头部（保证渲染），把js放在底部（保证非阻塞）。*
    
    *css阻塞:默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM
    *构建完毕。请务必精简您的 CSS，尽快提供它，并利用媒体类型和查询来解除对渲染的阻塞。*
    
    **link标签： 单独的下载线程异步下载的，不会阻塞dom解析的，但是会阻塞paint绘制render树，**
    **(当然如果是样式表也会阻塞cssom)**
    
    **script标签： 肯定是会阻塞dom解析的，假如浏览器遇到它，会下载它并执行里面的内容，才去继续解析下面的dom，**
    **解决办法有两个，一是在script标签上加上async或defer,一是使用createElement动态创建script;**
    **关于scrip标签具体如下**
    
    * Normal execution `<script>`
        
          浏览器默认：当执行script时解析html代码暂停。对于慢服务和重script的情况意味着webpage呈现将被延后。

    * Deferred execution `<script defer>`

          简而言之：推迟script执行直到html解析结束。该属性的好处就是DOM渲染友好，对于你的script。
          然而，并非每个浏览器支持该属性，故不要指望它！

    * Asynchronous execution `<script async>`

          不用管script何时好？async对于两个都是最好的：html解析可能持续且script将被执行一旦ready。
          对script标签推荐这个属性，如google analytics所分析。
          
          
### 3.load事件与DOMContentLoaded事件的先后

   *上面提到，渲染完毕后会触发load事件，那么你能分清楚load事件与DOMContentLoaded事件的先后么？*
   *很简单，知道它们的定义就可以了：*

   * 当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片。
    (譬如如果有async加载的脚本就不一定完成)

   * 当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片都已经加载完成了。
    （渲染完毕了）

   **所以，顺序是：DOMContentLoaded -> load**    
### 4.浏览器重绘(repaint)重排(reflow)与优化[浏览器机制]

   * 渲染

      网页生成的时候，至少会渲染一次。
      在用户访问的过程中，还会不断重新渲染
      重新渲染需要重复之前的第三步(重新生成布局)+第五步(重新绘制)或者只有第四个步(重新绘制)。
