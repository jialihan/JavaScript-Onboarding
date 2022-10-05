const boardEL = document.getElementById("board");
const width = 20;
const height = 20;
const size = 20;
let dir;
let pos;
let food;
let timer;

paintBoard();

function startGame() {
  clearBoard();
  paintFood();
  pos = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
  paintSnake();
  dir = [0, 1]; // "right";
  setKeyBoardEvent();

  timer = setInterval(() => {
    const nextX = pos[0] + dir[0];
    const nextY = pos[1] + dir[1];
    if (nextX < 0 || nextX >= 20 || nextY < 0 || nextY >= 20) {
      clearInterval(timer);
      console.log(pos);
      document.querySelector(".end-game").textContent = "GAME OVER!";
      return;
    }
    clearSnake();
    pos[0] = nextX;
    pos[1] = nextY;
    paintSnake();
    if (pos[0] === food[0] && pos[1] === food[1]) {
      paintFood();
    }
  }, 500);
}

function paintBoard() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      boardEL.insertAdjacentHTML(
        "beforeEnd",
        `<div class="cell" id=${i * 20 + j}></div>`
      );
    }
  }
}
function paintFood() {
  const x = Math.floor(Math.random() * 20);
  const y = Math.floor(Math.random() * 20);
  food = [x, y];
  const id = (x * 20 + y).toString();
  document.getElementById(id).style.backgroundColor = "red";
}

function paintSnake() {
  const id = (pos[0] * 20 + pos[1]).toString();
  document.getElementById(id).style.backgroundColor = "blue";
}

function setKeyBoardEvent() {
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 37:
        dir = [0, -1]; // "left";
        break;
      case 38:
        dir = [-1, 0]; //"up";
        break;
      case 39:
        dir = [0, 1]; //"right";
        break;
      case 40:
        dir = [1, 0]; // "down";
        break;
      default:
        break;
    }
  });
}

function clearSnake() {
  const id = (pos[0] * 20 + pos[1]).toString();
  document.getElementById(id).style.backgroundColor = "transparent";
}

function clearBoard() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const id = (i * 20 + j).toString();
      document.getElementById(id).style.backgroundColor = "transparent";
    }
  }
}

function stopGame() {
  clearInterval(timer);
}
