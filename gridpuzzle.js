let sec = 0; //记录时间
let stop; //保存间隔
let startflag = true; //记录是否已开始游戏
let img = 1;
//记录九宫格各个位置代表的值,0号不使用设为0，位置9初始无格子，记为0
let cellNum = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 0);
let cellMove = new Array( //记录九宫格各个位置可移动的位置
  [0],
  [2, 4],
  [1, 3, 5],
  [2, 6],
  [1, 5, 7],
  [2, 4, 6, 8],
  [3, 5, 9],
  [4, 8],
  [5, 7, 9],
  [6, 8]
);
let cellXY = new Array( //记录九宫格各个位置的坐标xy（left/top）
  [0],
  [0, 0],
  [150, 0],
  [300, 0],
  [0, 150],
  [150, 150],
  [300, 150],
  [0, 300],
  [150, 300],
  [300, 300]
);

window.onload = function() {
  displayTime();
  sec = 0;
  randomCell();
  clearInterval(stop);
  reset();
  if (startflag) start();
};
function randomCell() {
  let randomNum; //记录随机位置
  for (var i = 9; i > 1; i--) {
    randomNum = Math.floor(Math.random() * (i - 1)) + 1;

    //将格子与随机生成的位置的格子互换
    if (cellNum[i] != 0) {
      document.querySelector("#d" + cellNum[i]).style.left =
        cellXY[randomNum][0] + "px";
      document.querySelector("#d" + cellNum[i]).style.top =
        cellXY[randomNum][1] + "px";
    }
    if (cellNum[randomNum] != 0) {
      document.querySelector("#d" + cellNum[randomNum]).style.left =
        cellXY[i][0] + "px";
      document.querySelector("#d" + cellNum[randomNum]).style.top =
        cellXY[i][1] + "px";
    }
    let temp = cellNum[i];
    cellNum[i] = cellNum[randomNum]; //记录当前位置格子的值
    cellNum[randomNum] = temp;
  }
}
//为每个格子绑定点击事件
function bindClick() {
  for (var i = 1; i < 9; i++) {
    move(i);
  }
}
function removeClick() {
  for (var i = 1; i < 9; i++) {
    document.querySelector("#d" + i).onclick = null;
  }
}
//移动格子
function move(id) {
  document.querySelector("#d" + id).onclick = function() {
    //找出目前id所在的位置
    let curpos; //标识格子当前所在位置
    let movpos; //标识格子可移动的位置
    let finflag = true; //标识是否游戏结束
    for (curpos = 1; curpos < 10; curpos++) {
      if (cellNum[curpos] == id) {
        break;
      }
    }
    movpos = checkMoveDest(curpos);
    if (movpos != 0) {
      //该位置可移动

      cellNum[movpos] = cellNum[curpos]; //移动后位置设为移动过去格子的号码
      cellNum[curpos] = 0; //移动后原位置设为0
      //移动格子
      document.querySelector("#d" + id).style.left = cellXY[movpos][0] + "px";
      document.querySelector("#d" + id).style.top = cellXY[movpos][1] + "px";
    }
    //检查是否游戏结束
    for (var i = 0; i < 9; i++) {
      if (cellNum[i] != i) {
        //若此位置的值不等于其格子的值，表示未移动到正确的位置，故游戏仍在继续
        finflag = false;
        break;
      }
    }
    if (finflag) {
      if (!startflag) {
        //若游戏完成没有暂停，则调用暂停机制，结束游戏
        init();
      }
      clearInterval(stop);
      img++;
      if (img < 4) {
        alert("Congratulation! let's play more!");
        for (var i = 1; i < 9; i++) {
          document.querySelector("#d" + i).style.backgroundImage =
            "url(img" + img + "/" + i + ".jpg)";
        }
        document
          .querySelector("#imgpic")
          .setAttribute("src", "img" + img + "/img.jpg");
        randomCell();
        init();
        sec = 0;
        displayTime();
      } else {
        alert("Congratulation！！！");
      }
    }
  };
}
//检查是否可移动，若可移动则返回可移动的位置序列，若不可移动返回0
function checkMoveDest(id) {
  let pos;
  let flag = false;
  for (pos = 0; pos < cellMove[id].length; pos++) {
    //检查此位置所有可移动位置是否已经有格子
    if (cellNum[cellMove[id][pos]] == 0) {
      flag = true; //若某可移动位置为0，则表示此位置没有格子，则可移动
      break;
    }
  }
  if (flag == true) return cellMove[id][pos];
  else return 0;
}

function start() {
  document.querySelector("#start").addEventListener("click", function() {
    if (startflag) {
      stop = setInterval(displayTime, 1000);
      bindClick();
      //若当前已开始游戏，则start按钮变为暂停
      document.querySelector("#start").textContent = "暂停游戏";
      startflag = false;
    } else {
      init();
    }
  });
}
function init() {
  removeClick();
  document.querySelector("#start").textContent = "开始游戏";
  startflag = true;
  clearInterval(stop);
}
function reset() {
  document.querySelector("#reset").addEventListener("click", function() {
    sec = 0;
    randomCell();
    if (!startflag) document.querySelector("#start").textContent = "开始游戏";
    bindClick();
    clearInterval(stop);
    displayTime();
    removeClick();
  });
}
//展示时间
function displayTime() {
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec % 3600) / 60);
  let seconds = Math.floor(sec % 60);

  //当为个数时，将其格式改为0开始
  let displayHours = hours < 10 ? "0" + hours : hours;
  let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  document.querySelector("#time").textContent =
    "Time：" + displayMinutes + ":" + displaySeconds;
  sec++;
}
