### 箭头函数不会创建自己的 this,它只会从自己的作用域链的上一层继承 this

```
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

//调用方式1
let x = deck.createCardPicker();
let temp = x();
console.log(JSON.stringify(temp));

//调用方式2
let y = deck.createCardPicker;
let z = y()();
console.log(JSON.stringify(z));

```

**结论：箭头函数不会创建自己的 this,它只会从自己的作用域链的上一层继承 this**
