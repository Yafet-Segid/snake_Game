let border = document.getElementById("gameCanvas");
let canvasContext = border.getContext("2d");

// document.getElementById("btn").addEventListener("click", function () {});
let snake = {
  body: [{ x: 100, y: 100 }],
};

window.onload = function () {
  setInterval(callBoth, 800 / 6);

  function callBoth() {
    movingAdd();
    drawSnake();
    moveSnake();
    changeSnakeDirection();
    boarderGameOver();
    drawApple();
    eatApple();
  }
};

function changeSnakeDirection() {
  document.onkeydown = function (e) {
    var keyboard = e.key;

    if (keyboard === "ArrowUp") snake.direction = "up";
    if (keyboard === "ArrowDown") snake.direction = "down";
    if (keyboard === "ArrowRight") snake.direction = "right";
    if (keyboard === "ArrowLeft") snake.direction = "left";
  };
}

function moveSnake() {
  const snakeCopy = snake.body.map((part) => Object.assign({}, part));
  switch (snake.direction) {
    case "up":
      snake.body[0].y -= 20;
      break;
    case "down":
      snake.body[0].y += 20;
      break;
    case "right":
      snake.body[0].x += 20;
      break;
    case "left":
      snake.body[0].x -= 20;
      break;
  }
  for (let i = 1; i < snake.body.length; i++) {
    snake.body[i] = snakeCopy[i - 1];
  }
}

// Clear board

function movingAdd() {
  gameBorder(0, 0, border.height, border.width, "black");
}
//
function gameBorder(top, bottom, height, width, borderColor) {
  canvasContext.fillStyle = borderColor;
  canvasContext.fillRect(top, bottom, height, width);
  canvasContext.beginPath();
}

// Game over on border text template

function drawSnake() {
  let snakeWidth = 20;
  let snakeHeight = 20;
  snake.body.forEach((main) => {
    gameBorder(main.x, main.y, snakeWidth, snakeHeight, "lime");
  });
}

// Game Over red image
function boarderGameOver() {
  if (snake.body[0].x > border.width || snake.body[0].x < 0) {
    gameBorder();
    // let img = new Image();
    // img.src = "gameover.png";
    // canvasContext.drawImage(img, 210, 210, 350, 350);
  }
  if (snake.body[0].y > border.height || snake.body[0].y < 0) {
    let img = new Image();
    img.src = "gameover.png";
    canvasContext.drawImage(img, 210, 210, 350, 350);
  }
}

//
let apple = {
  x: Math.floor((Math.random() * border.width) % 20) * 20,
  y: Math.floor((Math.random() * border.height) % 20) * 20,
};

function drawApple() {
  gameBorder(apple.x, apple.y, 20, 20, "red");
}

let score = 0;

function eatApple() {
  if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
    (apple.x = Math.floor((Math.random() * border.width) % 20) * 20),
      (apple.y = Math.floor((Math.random() * border.width) % 20) * 20),
      snake.body.push({ x: apple.x, y: apple.y });
    score = score + 10;
    const higher = (document.getElementById("displayScore").innerHTML = score);
    if (score > higher) {
      document.getElementById("HighestScore");

      localStorage.setItem("HighestScore", innerHTML.score);
    }
  }
}

//

if (apple.x === snake.body[i].x && apple.y === snake.body[i].y) {
  let img = new Image();
  img.src = "gameover.png";
  canvasContext.drawImage(img, 210, 210, 350, 350);
}
