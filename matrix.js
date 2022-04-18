const canvas = document.querySelector("canvas");
canvas.width = 200;
canvas.height = 400;
const ctx = canvas.getContext("2d");
ctx.scale(20, 20);
const COLS = 10;
const ROWS = 20;
const MIN_LENGTH = (canvas.height / 20) / 5;
const MAX_LENGTH = canvas.height / 20;
const OPAC_FACTOR = 0.002;
const FONT = "1px Arial";
let columns = [];

//const CHAR_SET = "abcdefghijklmnopqrstuvwxyz".split("");
const CHAR_SET = "0123456789".split("");

function random(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Column {
  constructor(x, chars) {
    this.x = x;
    this.chars = chars;
  }
}

class Char {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.opac = 1;
  }
}

function drawCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
drawCanvas();


(function createStartColumns() {
  for (let x = 0; x < COLS; x++) {

    // add this to y-pos to get random entry times
    let offset = random(100);

    columns.push(
      new Column(
        x,
        Array(random(MIN_LENGTH, MAX_LENGTH)).fill()
          .map((_, i) =>
            new Char(
              CHAR_SET[random(CHAR_SET.length - 1)],
              x,
              -i - offset,
            )
          ),
      )
    )
  }
})();

(function check() {
  requestAnimationFrame(check);
  draw();
  insertNewColumns();
})();

function insertNewColumns() {
  columns.forEach((column, x) => {
    if (
      column.chars.every(char => char.y > canvas.height / 20) ||
      column.chars.every(char => char.opac <= 0)
    ) {
      columns.splice(
        x,
        1,
        new Column(
          x,
          Array(random(MIN_LENGTH, MAX_LENGTH)).fill()
            .map((_, i) =>
              new Char(
                CHAR_SET[random(CHAR_SET.length - 1)],
                x,
                -i
              )
            ),
        )
      )
      // debugger;
    }
  }
  )
}

setInterval(() => {
  move();
  drawCanvas()
  draw();
}, 100)

function move() {
  columns.forEach(column => {
    column.chars.forEach(char => {
      char.y++;
    });
  })
}

function draw() {
  ctx.font = FONT;

  columns.forEach((column, i) => {
    column.chars.forEach((char, j) => {
      if (char.y > 0) {
        char.opac -= Math.random() * OPAC_FACTOR * char.y;
        ctx.fillStyle = `rgba(0, 255, 0, ${char.opac})`;
        ctx.fillText(char.char, char.x, char.y + 1);
      }
    })
  })
}