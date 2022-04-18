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
let columns = [];

//const LETTER_SET = "abcdefghijklmnopqrstuvwxyz".split("");
const LETTER_SET = "0123456789".split("");

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
    this.opac = 1;
  }
}

function drawCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
drawCanvas();


(function createColumns() {
  for (let x = 0; x < COLS; x++) {
    let offset = random(100);

    columns.push(
      new Column(
        x,
        Array(random(MIN_LENGTH, MAX_LENGTH)).fill()
          .map((_, i) =>
            new Letter(
              LETTER_SET[random(LETTER_SET.length - 1)],
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
      column.letters.every(letter => letter.y > canvas.height / 20) ||
      column.letters.every(letter => letter.opac <= 0)
    ) {
      columns.splice(
        x,
        1,
        new Column(
          x,
          Array(random(MIN_LENGTH, MAX_LENGTH)).fill()
            .map((_, i) =>
              new Letter(
                LETTER_SET[random(LETTER_SET.length - 1)],
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
    column.letters.forEach(letter => {
      letter.y++;
    });
  })
}

function draw() {
  ctx.font = "1px Arial";

  columns.forEach((column, i) => {
    column.letters.forEach((letter, j) => {
      if (letter.y > 0) {
        letter.opac -= Math.random() * OPAC_FACTOR * letter.y;
        ctx.fillStyle = `rgba(0, 255, 0, ${letter.opac})`;
        ctx.fillText(letter.char, letter.x, letter.y + 1);
      }
    })
  })
}