## 使用css伪类，实现加载更多和收起

### 思路如下：

- js判断文本是否溢出
  - 初始化渲染后要判断文本是否溢出；
  - 窗口大小改变判断文本是否溢出；
  - 判断文本溢出，需要给容器一个固定高度（初始高度），来判断是否溢出；
- 然后根据文本时候展开，分别显示加载跟多或收起伪元素
- 用css给伪类启用点击事件

### 代码如下

  - html代码
  
  ```javascript
  import React, { useEffect, useState } from "react";
    import "./OverflowEciple.css";
    export default function OverflowEciple(props) {
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [isFold, setIsFold] = useState(true);
    useEffect(() => {
        function handleResize() {
        const contentDom = window.document.getElementById("textContentDom");
        //文本溢出
        if (contentDom.scrollHeight > 50) {
            setIsOverFlow(true);
        } else {
            setIsOverFlow(false);
        }
        }
        const wrapHandleResize = throttle(handleResize, 100);
        wrapHandleResize();
        window.addEventListener("resize", wrapHandleResize);
        return function() {
        window.removeEventListener("resize", wrapHandleResize);
        };
    }, []);

    //防抖
    function throttle(func, delay) {
        let pre = Date.now();
        return function() {
        let now = Date.now();
        if (now - pre >= delay) {
            func.apply(this, arguments);
            pre = now;
        }
        };
    }

    //点击折叠或者展开
    function handleFold() {
        setIsFold(!isFold);
    }

    return (
        <div
        id="textContentDom"
        className={isOverFlow ? "overflowed" : "unOverflowed"}
        isfold={isFold + ""}
        onClick={handleFold}
        >
        fdsfsdfsdfsdf你好我不闪躲我非要这么做，见领名是让你明白，没有别的路要走，让你感觉爱
        对你偏爱fdsfsdfsdfsdf你好我不闪躲我非要这么做，见领名是让你明白，没有别的路要走，让你感觉爱
        </div>
    );
    }
  ```

  - css代码：

  ```css
    #textContentDom {
        pointer-events: none;
    }
    .unOverflowed {
        height: 50px;
    }

    .overflowed[isfold="true"] {
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 50px;
        line-height: 25px;
    }

    .overflowed[isfold="false"] {
        height: auto;
        line-height: 25px;
    }

    .overflowed[isfold="true"]::after {
        position: absolute;
        right: 0;
        top: 25px;
        content: "...加载更多";
    }

    .overflowed[isfold="false"]::after {
        position: relative;
        content: "...收起";
    }

    .overflowed::after {
        cursor: pointer;
        background: white;
        text-align: center;
        pointer-events: auto;
        color: blue;
    }
  ```