#### css 中的图形

- css 中基础图形 basic-shape

  <basic-shape>是一种表现基础图形的 CSS 数据类型，作用于 clip-path 与 shape-outside 属性中。

  - inset() 矩形

    - 语法：`inset( <shape-arg>{1,4} [round <border-radius>]? )`
    - 案例： `clip-path: inset(52% 32% 25px 55px);`

    **有四个参数，分别表示矩形距离上，右，下，左的距离**
    <br>

  - circle() 矩形

    - 语法：`circle( [<shape-radius>]? [at <position>]? )`
    - 案例：`clip-path: circle(6rem at 12rem 8rem);`

    **第一个参数表示圆半径长度，at 后面的是坐标，圆心的位置**
    <br>

  - ellipse() 椭圆

    - 语法：`ellipse( [<shape-radius>{2}]? [at <position>]? )`
    - 案例：`clip-path: ellipse(115px 55px at 50% 40%);`

    **第一个参数 shape-radius 有两个值，分表表示横柱半径 Rx,和纵柱半径 Ry;at 后面的是坐标，t 椭圆心的位置**
    <br>

  - polygon() 多边形

    - 语法：`polygon( [<fill-rule>,]? [<shape-arg> <shape-arg>]# )`
    - 案例：`clip-path: polygon(50% 20%, 90% 80%, 10% 80%);`

    **参数是一个数组，数组中是多边形每个顶点的坐标**
    <br>

  - path() svg 裁剪图片

    - 语法：`url( svg图片路径 )`
      **path 是一个 svg 图片的路径，这个图形就是这个 svg 图片 的边界**
    - 案例：

      ```
      <svg>
      <clipPath id="myPath">
          <path
          d="M82.44294954150537,38.19660112501052 A200 200 0 0 1 317.55705045849464 38.19660112501052 L200 200"
          ></path>
      </clipPath>
      </svg>
      <div class="sector"></div>
      <style>
      .sector {
          height: 100px;
          width: 350px;
          clip-path: url(#myPath);
          background-size: contain !important;
          background-repeat: no-repeat;
          background: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1551039200,1108067788&fm=26&gp=0.jpg');
      }
      </style>
      ```

      <br>

- css 裁剪路径 clip-path

  clip-path CSS 属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的 URL 定义的路径或者外部 svg 的路径，或者作为一个形状例如 circle().。clip-path 属性代替了现在已经弃用的剪切 clip 属性。

  **也就是在一个元素上（可以根据 css 基本图形）进行裁剪，只有裁剪的部分可见，其余的部分将会隐藏**

  - 比如： `clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);`
    <br>

- css 裁剪路径 shape-outside

  shape-outside 的 CSS 属性定义了一个可以是非矩形的形状，相邻的**内联**内容应围绕该形状进行包装。 默认情况下，内联内容包围其边距框; shape-outside 提供了一种自定义此包装的方法，可以将文本包装在复杂对象周围而不是简单的框中。

  **shop-outside 并不会改变元素的边框，border,仅仅只是定义了一个形状边界，**

  - 案例 实现文字环绕图片

  ```
  <div>
      <div class="image"></div>
      <p class="title">王院长</p>
      <p class="text">
        毕业于上海交通大学，曾任合肥工业大学副校长、校长，研究生导师，享受国务院特殊津贴，任国家教育部高级职称评定权审定委员会委员、中国教育国际交流协会理事、国家科技评奖委员会委员等职。2000年至今任新华学院院长职务。
      </p>
      <p class="text">
        王成福教授是我国材料科学方面的著名专家，在材料科学学科领域中开展科研工作，先后完成国家火炬计划、国家自然科学基金等国家及省部级课题10余项，多次获得科技成果奖，已发表学术论文70余篇。
        他在科研工作中坚持自主创新，走艰苦创业道路，在科技成果转化中成绩显著，曾获得国家多项发明专利。其专利成果于1999年参与安徽省某新材料公司的项目在上海证交所正式上市，被誉为“安徽高校第一个吃螃蟹者”。
        他在科研工作中坚持自主创新，走艰苦创业道路，在科技成果转化中成绩显著，曾获得国家多项发明专利。其专利成果于1999年参与安徽省某新材料公司的项目在上海证交所正式上市，被誉为“安徽高校第一个吃螃蟹者”。
      </p>
      <p class="text">
        他在科研工作中坚持自主创新，走艰苦创业道路，在科技成果转化中成绩显著，曾获得国家多项发明专利。其专利成果于1999年参与安徽省某新材料公司的项目在上海证交所正式上市，被誉为“安徽高校第一个吃螃蟹者”。
      </p>
    </div>

    <style>
      .image {
        height: 300px;
        width: 300px;
        margin-top: 50px;
        border-radius: 50%;
        right: 100px;
        shape-outside: circle(150px at 50% 50%);
        -webkit-shape-outside: circle(150px at 50% 50%);
        float: right;
        background: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1551039200,1108067788&fm=26&gp=0.jpg');
      }
  </style>
  ```
  
 可以参考[shap-outline](https://wow.techbrood.com/fiddle/31483)
 
