const canvas = document.querySelector("canvas");
canvas.width = 200;
canvas.height = 400;
const ctx = canvas.getContext("2d");
ctx.scale(20, 20);
const COLS = 10;
const ROWS = 20;

//const letterSet = "abcdefghijklmnopqrstuvwxyz".split("");
const letterSet = "0123456789".split("");
document.querySelector("button").addEventListener("click", createColumns);

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



let columns = [];

function createColumns() {
  for (let x = 0; x < COLS; x++) {
    let offset = random(1000);

    columns.push(
      new Column(
        x,
        Array(random(5, 15)).fill()
          .map((_, i) => new Letter(letterSet[random(letterSet.length - 1)], x, -i - offset)),
        //random(2000, 2000)
      )
    )
    
  }
}
createColumns();

// setInterval(() => {
//   createColumns();
// }, random(5000, 1000))


function check() {
  requestAnimationFrame(check);
  
  columns.forEach((column, x) => {
    if (column.letters.every(letter => letter.y > ROWS)) {
      columns.splice(
        x,
        1,
        new Column(
          x,
          Array(random(5, 15)).fill()
            .map((_, i) => new Letter(
              letterSet[random(letterSet.length - 1)],
              x,
              -i)
            ),
          //random(2000, 2000)
        ))
    }
  })
}check();


setInterval(() => {
  move();
  drawCanvas()
  draw();
}, 100)

function move() {
  columns.forEach(column => {
    column.letters.forEach(letter => {
      letter.y++;
    });
  })
}

function draw() {
  ctx.font = "1px Arial";
  
  columns.forEach((column, i) => {
    column.letters.forEach((letter, j) => {
      ctx.fillStyle = `rgba(0, 255, 0, ${1 - 0.02 * letter.y})`;
      ctx.fillText(letter.char, letter.x, letter.y + 1);
    })
  })
}