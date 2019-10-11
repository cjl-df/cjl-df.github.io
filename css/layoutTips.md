#### 更直观的查看页面布局

1.编写代码

   ```
 (function() {
     var style = document.getElementById('_outline');
     if (style) {
     style.parentNode.removeChild(style);
     } else {
     style = document.createElement('style');
     style.id = '_outline';
     style.innerHTML = '*{outline:1px solid red!important}';
     document.body.appendChild(style);
     }
 })();
   ```

2.点击收藏，在收藏的网址中填写如下
  
 `javascript:上面的代码`
