# 九宫格拼图游戏

## 实现效果

![showall](https://github.com/ChangeZ24/game-gridpuzzle/blob/master/image/showall.gif)

在线试玩地址： http://awesolynn.me/game-gridpuzzle/gridpuzzle.html

## 实现功能

### 初始化

- 整个九宫格看作一个 div，分为 9 份，位置号为 1~9

- 九宫格内 8 个活动格看作 8 个 div，格号为 1~8，第 9 格为空格，记为 0

### 乱序排列九宫格内 8 个活动格

> 算法：

> 1、从第 9 格空格开始，选取随机位置号为 1~9 的某格进行两两替换

> 2、接下来，第 8 格，即格号为 8（初始后格号为 8 的格同在位置 8），则选取随机位置号为 1~8 的格进行两两替换

> 以此类推

### 活动格鼠标点击进行滑动

> 算法：

> 1、初始时，使用数组记录每个位置可移动的位置号，如位置 1，可移动到位置 2 和位置 4

> 2、使用数组记录每个位置格的左上角点的 x、y 值，在 css 中即为 left、top 值，即每个格从位置 1 移动到位置 2，改变的位移值。

> 3、当鼠标进行点击某格时，若其可移动的格内有空格，则其位移变为空格的 x、y 值，完成移动的动作。

### 时间记录

> 时间记录，同样使用`setInterval()`函数按 1000ms 的间隔进行实时计算。

### 关卡设置

> 本游戏共设置 3 关，当每关成功完成拼图，会出现提示`play more`表示进入下一关

![next](https://github.com/ChangeZ24/game-gridpuzzle/blob/master/image/next.gif)

> 当位于最后一关时，成功后只会提示`congratulations`，表示游戏结束。

### 暂停、重玩机制

> 当点击开始游戏后，开始游戏的按钮会自动变为暂停游戏

> 点击暂停游戏后，时间暂停，各活动格也无法点击，只有点击开始游戏继续玩或点击重新开始，重启此关

![pause](https://github.com/ChangeZ24/game-gridpuzzle/blob/master/image/pause.gif)

> 点击重新开始，会重新启动所在的关卡，重排整个图。

![reset](https://github.com/ChangeZ24/game-gridpuzzle/blob/master/image/reset.gif)

## 疑惑/学习点

### 对 CSS 中 position 的理解

#### 基础定义

position：用于层的绝对定位，即让一个层位于一个层内具体什么位置

参数：

- static：默认。按页面文档流放置，忽略 top、bottom、left、right 设置的值

- relative：相对位置。对象不可层叠，可通过 top、bottom、left、right 设置在文档流中的位置

- absolute：绝对位置。对象可通过 z-index 设置层叠，对象被从文档流拖出，根据 top、bottom、left、right 等属性进行绝对定位。

- fixed：固定位置。通过 top、bottom、left、right 进行定位，页面滚动，对象仍存在于固定的位置不变。

#### 对相对、绝对位置的理解

1. 当子级使用`position: absolute;`时。其父级通常定义为`position: relative;`

   父级使用`position: relative;`相对位置时，最好同时定义其`width`和`height`。

   此时，子级使用`position: absolute;`，设置的`top/bottom、left/right`即为距离父级上/下侧、左/右侧的距离，有点类似外边距。

   > **注意**：此时`top/bottom`二选一，`left/right`二选一，只能左上或右下！

2. 当子级使用`position: absolute;`但父级没有设置`position: relative;`时，无论子级处于 div 哪一层，都会被拖出文档流，以 `body`为父级，所设置的所有 `top/bottom、left/right`都会为距离`body`的上/下侧、左/右侧的距离，不受其父级控制。

## 参考内容

1. 实验楼拼图实现教学

   https://www.shiyanlou.com/courses/161

2. CSS 中 position 相关讲解

   http://www.divcss5.com/rumen/r403.shtml
