// codepen link: https://codepen.io/jellyhan27/pen/QWrBdyv

const boardEL = document.getElementById("board");
const width = 20;
const height = 20;
const size = 20;
let dir = [0, 1]; // "right";
let pos = [
  [0, 3],
  [0, 2],
  [0, 1],
  [0, 0]
];
let food;
let timer;

paintBoard();

function startGame() {
  clearBoard();
  paintFood();
  paintSnake();
  setKeyBoardEvent();
  startTimer();
}
function startTimer() {
  timer = setInterval(() => {
    clearSnake();
    snakeMove();
    paintSnake();
  }, 500);
}
function snakeMove() {
  const headX = pos[0][0] + dir[0];
  const headY = pos[0][1] + dir[1];
  pos.unshift([headX, headY]);

  // check food
  if (headX === food[0] && headY === food[1]) {
    paintFood();
  } else {
    pos.pop();
  }

  // validate snake pos and body
  if (headX < 0 || headX >= 20 || headY < 0 || headY >= 20) {
    endGame();
  }
  for (let i = 1; i < pos.length; i++) {
    const [x, y] = pos[i];
    if (x === headX && y === headY) {
      endGame();
    }
  }
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
  // pos = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
  let id;
  for (const p of pos) {
    id = (p[0] * 20 + p[1]).toString();
    document.getElementById(id).style.backgroundColor = "blue";
  }
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
  for (const p of pos) {
    const id = (p[0] * 20 + p[1]).toString();
    document.getElementById(id).style.backgroundColor = "transparent";
  }
}

function clearBoard() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const id = (i * 20 + j).toString();
      document.getElementById(id).style.backgroundColor = "transparent";
    }
  }
}

function endGame() {
  clearInterval(timer);
  //   console.log(pos);
  document.querySelector(".end-game").textContent = "GAME OVER!";
  return;
}

function pauseGame() {
  clearInterval(timer);
}

function resumeGame() {
  startTimer();
}
