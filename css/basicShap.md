## css 中的图形

#### css 中基础图形 basic-shape

basic-shape是一种表现基础图形的 CSS 数据类型，作用于 clip-path 与 shape-outside 属性中。

- inset() 矩形

  - 语法：`inset( <shape-arg>{1,4} [round <border-radius>]? )`
  - 案例： `clip-path: inset(52% 32% 25px 55px);`

  - **有四个参数，分别表示矩形距离上，右，下，左的距离**
  <br>

- circle() 矩形

  - 语法：`circle( [<shape-radius>]? [at <position>]? )`
  - 案例：`clip-path: circle(6rem at 12rem 8rem);`

  - **第一个参数表示圆半径长度，at 后面的是坐标，圆心的位置**
  <br>

- ellipse() 椭圆

  - 语法：`ellipse( [<shape-radius>{2}]? [at <position>]? )`
  - 案例：`clip-path: ellipse(115px 55px at 50% 40%);`

  - **第一个参数 shape-radius 有两个值，分表表示横柱半径 Rx,和纵柱半径 Ry;at 后面的是坐标，t 椭圆心的位置**
  <br>

- polygon() 多边形

  - 语法：`polygon( [<fill-rule>,]? [<shape-arg> <shape-arg>]# )`
  - 案例：`clip-path: polygon(50% 20%, 90% 80%, 10% 80%);`

  - **参数是一个数组，数组中是多边形每个顶点的坐标**
  <br>

- path() svg 裁剪图片

  - 语法：`url( svg图片路径 )`
    **path 是一个 svg 图片的路径，这个图形就是这个 svg 图片 的边界**
  - 案例：

  <br>

#### css 裁剪路径 clip-path

clip-path CSS 属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的 URL 定义的路径或者外部 svg 的路径，或者作为一个形状例如 circle().。clip-path 属性代替了现在已经弃用的剪切 clip 属性。

  - **也就是在一个元素上（可以根据 css 基本图形）进行裁剪，只有裁剪的部分可见，其余的部分将会隐藏**

- 比如： `clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);`
  <br>

#### css 裁剪路径 shape-outside

shape-outside 的 CSS 属性定义了一个可以是非矩形的形状，相邻的**内联**内容应围绕该形状进行包装。 默认情况下，内联内容包围其边距框; shape-outside 提供了一种自定义此包装的方法，可以将文本包装在复杂对象周围而不是简单的框中。

  - **shop-outside 并不会改变元素的边框，border,仅仅只是定义了一个形状边界，**

  - 案例 实现文字环绕图片



  - 可以参考[shap-outline](https://wow.techbrood.com/fiddle/31483)
