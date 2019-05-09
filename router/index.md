### 前端路由

   * 前端路由前提

         提起前端路由，我们应该明白，这是一个spa项目，也就是但页面应用(single page applycation)；
         也就是在url发生变化时，浏览器并不发送请求；

   * 前端路由两种实现

        * hash路由：也就是url中存在#;通过监听hash变化，过着改变hash来切换跳转路由

        * H5 History：通过h5 History的pushState replaceState popstate三个api来实现，因为调用这个三个
            改变页面的url，浏览器并不会重新请求。(仅仅调用pushState方法或replaceState方法 ，并不会触发该
            事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用back、forward、go方法时才会触发。)

   * hash实现

        

   * history实现
