### javasciprt 如何实现同步那

最近一直在想这个问题，javascript 如何实现同步，最近实现了一下，不过都是借助ES6语法，不知道还有没有其他的实现方式？自己想了一下实在想不出其他的方式了，大家有的话可以交流一下；曾考虑过(消息队列或者generator)从原理上思考好像实现不了，写了一下，也没能实现

- 第一种借助async,await

    ```javascript
    async function asyncTest() {
        for (let i = 0; i < 10; i++) {
            await setTimeout(() => {
            console.log(i);
            });
        }
    }
    ```

- 第二种借助promise.resolve

    ```javascript
    Promise.resolve(
        new Promise((resolve, reject) => {
            setTimeout(() => {
            console.log("1");
            resolve();
            }, 1000);
        })
        )
        .then(() => {
            return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("2");
                resolve();
            }, 500);
            });
        })
        .then(() => {
            return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("3");
                resolve();
            }, 50);
            });
        });
    ```

- 第三种属于第二中的变形了

    ```javascript
    function asyncPromise() {
        function generatorPromise(i) {
            return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(i);
                resolve(i);
            }, Math.random() * 10);
            });
        }

        let _this = Promise.resolve(true);
        for (let i = 0; i < 10; i++) {
            _this = _this.then(() => generatorPromise(i));
        }
    }

    asyncPromise();
    ```
