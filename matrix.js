const canvas = document.querySelector("canvas");
canvas.width = 200;
canvas.height = 400;
const ctx = canvas.getContext("2d");
ctx.scale(20, 20);
const COLS = 10;
const ROWS = 20;

const letterSet = "abcdefghijklmnopqrstuvwxyz".split("");

function random(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Column {
  constructor(x, letters) {
    this.x = x;
    this.letters = letters;
  }
}

class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
  }
}

function drawCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
drawCanvas();



const columns = [];

(function createColumns() {
  for (let x = 0; x < COLS; x++) {
    columns.push(
      new Column(
        x,
        Array(random(5, 15)).fill()
          .map((_, i) => new Letter(letterSet[random(25)], x, -i))
      )
    )
  }
})();



setInterval(() => {
  move();
  drawCanvas()
  draw();
}, 1000)

function move() {
  columns.forEach(column => {
    column.letters.forEach(letter => {
      letter.y++;
    });
  })
}

function draw() {
  ctx.fillStyle = "rgba(0, 255, 0, 1)";
  ctx.font = "1px Arial";

  columns.forEach((column, i) => {
    column.letters.forEach((letter, j) => {
      ctx.fillText(letter.char, letter.x, letter.y + 1);
    })
  })
}