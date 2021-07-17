let border = document.getElementById("gameCanvas");
let canvasContext = border.getContext("2d");
let tail = 20;

let snake = {
  body: [{ x: 200, y: 200 }],
  direction: undefined,
};

let apple = {
  x: Math.floor((Math.random() * border.width) % 20) * 20,
  y: Math.floor((Math.random() * border.height) % 20) * 20,
};

console.log(apple.x, apple.y);

window.onload = function () {
  setInterval(callBoth, 800 / 3);

  function callBoth() {
    circleSnake();
    movingAdd();
    drawSnake();
    moveSnake();
    changeSnakeDirection();
    //
    boarderGameOver();
    drawApple();
    test();
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
  const snakeWidth = 20;
  const snakeHeight = 20;
  snake.body.forEach((main) => {
    gameBorder(main.x, main.y, snakeWidth, snakeHeight, "lime");
  });
}

// make snake circle
function circleSnake(centerX, centerY, radius, borderColor) {
  canvasContext.fillStyle = borderColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

// Game Over red image
function boarderGameOver() {
  if (snake.body[0].x > border.width || snake.body[0].x < 0) {
    let img = new Image();
    img.src = "gameover.png";
    canvasContext.drawImage(img, 210, 210, 350, 350);
  }
  if (snake.body[0].y > border.height || snake.body[0].y < 0) {
    let img = new Image();
    img.src = "gameover.png";
    canvasContext.drawImage(img, 210, 210, 350, 350);
  }
}

//
// function apple() {
//   randomX = Math.floor(Math.random() * border.width);
//   randomY = Math.floor(Math.random() * border.height);

// if (randomX === x || randomY === y) {
//   alert("yes");
// }
//   gameBorder(randomX, randomY, 20, 20, "red");
// }

function drawApple() {
  gameBorder(apple.x, apple.y, 20, 20, "red");
}

function test() {
  if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
    alert(`Snake ate the apple`);
  }
}
