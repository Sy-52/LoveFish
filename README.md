# LoveFish
## 1 文档规范
1、待做标注为`//TODO` <br/>
2、已做标注为`//DONE`
## 2 前言
H5添加了很多新鲜、有趣的标签，不仅为前端提供了多样化的功能，还给了开发者在设计产品时更大的自由度。 <br/>
LoveFish是一款HTML5游戏，是我对画布作图对象 -- CanvasRenderingContext2D中的一个实践。毕竟，当时H5游戏很火。<br/>
## 3 使用
-> 下载本项目<br/>
-> 解压后Seurat放在'wordpress/wp-content/themes'目录下<br/>
-> 在浏览器中打开'page/loveFish.html'即可<br/>
-> 项目界面如下图：<br/>
![interface](../widget/image/cover.png)
## 4 技术选型
HTML5 + CSS、 + jvascript + fis3 + requirejs<br/>
### 4.1 requirejs
LoveFish的HTML和CSS结构十分简单，但Javascript较为复杂。<br/>
由于程序逻辑性较强、JS文件间依赖关系复杂，我选用了模块加载器 -- [Require.js](http://www.requirejs.cn/)去进行模块管理，便于开发。<br/>
### 4.2 FIS3
为了优化性能，我采用了百度开发的前端构建工具[FIS3](http://fis.baidu.com/)去进行文件、图片的压缩。
## 5 不足
####5.1 游戏性
1、大鱼喂食小鱼模块有逻辑上的Bug。大鱼无论是吃一颗果实还是吃N颗果实，喂食小鱼后小鱼都会恢复至满血状态。`//TODO`<br/>
2、大鱼在吃果实时应添加动作，更显生动。`//TODO`<br/>
3、可以尝试添加有毒的果实、躲避凶猛的大型鱼类等多种关卡。`//TODO`<br/>
####5.2 游戏性能
游戏中的每一个事物我都将其作为对象去构造的，它们各自都有在构造函数上定义的属性及在原型对象上定义的方法。<br/>
这种模式不是最优模式，后面需持续优化代码。`//TODO`<br/>
