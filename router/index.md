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
      
      * 建立html:
      
      ```
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>前端路由实现</title>
      <style>
            .warp{
                  width:400px;
                  height:400px;
                  border:1px solid grey;
                  margin:0 auto;
            }
            .nav{
                  border-bottom:1px solid grey;
            }
            .nav li{
                  display:inline-block;
                  list-style:none;
            }
            .nav li a{
                  display:inline-block;
                  text-decoration: none;
                  padding:10px 15px;
            }
            .router{
                  padding:20px;
            }
            a{
                  cursor: pointer;
            }
      </style>

      </head>
      <body>
      <section class="warp">
            <div class="nav">          
                  <ul>
                  <li><a href="#index" data-path="index">首页</a></li> 
                  <li><a href="#news" data-path="news">新闻</a></li>
                  <li><a href="#about" data-path="about">关于</a></li>
                  </ul>
            </div>
            <div id="container" class="router">
                  <!-- 内容加载区域 -->
            </div>
      </section>
      </body>
      </html>
       ``` 

      * hash实现路由：
      ```
      <script>
      (function(){
            //定义路由，
            let routers = [
            {
            key:'#index',
            component:'<p>welcome 首页</p>',
            state:''
            },{
            key:'#news',
            component:'<p>国际新闻</p>',
            state:''
            },{
            key:'#about',
            component:'<p>关于我们</p>',
            state:''
            },
      ] 

      //监听hash变化
      window.addEventListener('load',handleHash,false)
      window.addEventListener('hashchange',handleHash,false)

      function handleHash(e){
            const dom = window.document.getElementById('container')
            const current = routers.filter(item=>{
                  return window.location.hash === item.key
            })
            dom.innerHTML = current[0] && current[0].component
      }
      })()
      </script>
      ```

   * history实现

      * 先修改下html，也就是修改section部分：
      
      ```
      <section class="warp">
        <div class="nav">          
            <ul>
                  <li><a onclick="linkTo('/index')" href="javascript:void(0)" data-path="index">首页</a></li> 
                  <li><a onclick="linkTo('/news')" href="javascript:void(0)" data-path="news">新闻</a></li>
                  <li><a onclick="linkTo('/about')" href="javascript:void(0)" data-path="about">关于</a></li>
            </ul>
        </div>
        <div id="router" class="router">
            <!-- 内容加载区域 -->
        </div>
      </section>
      ```

    * history路由实现：

      ```
      <script >
           (function(){   

            var url = '内容展示';

            history.replaceState(url,null,'');//最开始的状态，采用replace直接替换
            document.getElementById('router').innerHTML ='<p>'+url+'</p>'

            window.addEventListener('popstate',function(e){
                console.log(e.state);
                url = e.state
                document.getElementById('router').innerHTML='<p>'+ url +'</p>'

            });
                
            })()
            function linkTo(path){
                console.log(path)
                document.getElementById('router').innerHTML='<p>'+ path +'</p>'
                history.pushState(path,null,path);
            } 
      </script>
      ```

    * 总结：
      
      1.无论是HASH还是History,都是属于但也面应用，
      2.因为切换路由，并不发送请求，所有路由表现的就像div以下，其实一个路由，就是一个div
      3.hash路由带#显得不够美观;如果刷新浏览器，浏览器请求页面hash会忽略#后面的，所以一般都是/index#xxx,仍然会获取index;如果是history,刷新/index/xxx，如果xxx没有配置重定向到首页，回报400