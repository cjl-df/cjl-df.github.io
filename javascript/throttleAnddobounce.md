#### 防抖节流

- 防抖

  - 定时器实现方式

  ```
  function throttle(func, timeout) {
      let timeId = null;
      return function() {
          if (!timeId) {
          timeId = setTimeout(() => {
              func.apply(this, arguments);
              timeId = null;
          }, timeout);
          }
      };
  }
  ```

  - 非定时器实现方式

  ```
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
  ```

- 节流

  - 定时器实现方式

  ```
  function dobounce(func, timeout) {
      let timeId = null;
      return function() {
          if (timeId) {
          clearTimeout(timeId);
          }
          timeId = setTimeout(() => {
          func.apply(this, arguments);
          }, timeout);
      };
  }
  ```

  - 非定时器实现方式

  ```
  function dobounce(func, delay) {
      let pre = Date.now();
      return function() {
          let now = Date.now();
          if (now - pre >= delay) {
          func.apply(this, arguments);
          }
          pre = now;
      };
  }
  ```
