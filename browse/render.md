### 渲染引擎

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

### 渲染
  
   *浏览器对请求的呈现。默认渲染引擎可以呈现html，xml及图片。（通过插件）也可以呈现其它数据，比如pdf等。 目前只考虑html和css方面。*
   
   * 渲染流程
   
     * 解析html建立dom树
    
     * 解析css构建render树（将CSS代码解析成树形的数据结构，然后结合DOM合并成render树）
   
     * 布局render树（Layout/reflow），负责各元素尺寸、位置的计算
   
     * 绘制render树（paint），绘制页面像素信息
   
     * 浏览器会将各层的信息发送给GPU，GPU会将各层合成（composite），显示在屏幕上
   
    浏览器拿到了 server 端返回的 HTML 内容后，开始解析并渲染。最初拿到的内容就是一堆字符串，必须先结构
    化成计算机擅长处理的基本数据结构--- DOM 树 (最基本的数据结构之一)。
    解析过程中，如果遇到<link href="...">和<script src="...">这种外链加载 CSS 和 JS 的标签，
    浏览器会异步下载，下载过程和上文中下载 HTML 的流程一样。只不过，这里下载下来的字符串是 CSS 或者 JS 格式的。
    
  * 渲染流程阻塞
     
    *常把css放在头部（保证渲染），把js放在底部（保证非阻塞）。*
    
    *css阻塞:默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM
    *构建完毕。请务必精简您的 CSS，尽快提供它，并利用媒体类型和查询来解除对渲染的阻塞。*

    * Normal execution <script>
        
          浏览器默认：当执行script时解析html代码暂停。对于慢服务和重script的情况意味着webpage呈现将被延后。

    * Deferred execution <script defer>

          简而言之：推迟script执行直到html解析结束。该属性的好处就是DOM渲染友好，对于你的script。
          然而，并非每个浏览器支持该属性，故不要指望它！

    * Asynchronous execution <script async>

          不用管script何时好？async对于两个都是最好的：html解析可能持续且script将被执行一旦ready。
          对script标签推荐这个属性，如google analytics所分析。
          
          

    
