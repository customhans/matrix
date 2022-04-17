const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 200;
canvas.height = 400;
ctx.scale(20, 20);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const COLS = 10;
const ROWS = 20;
const columns = [];

const letterSet = "abcdefghijklmnopqrstuvwxyz".split("");

function random(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Column {
  constructor(x, intv) {
    this.x = x;
    this.intv = intv;
    this.chars = [];
  }
}

class Char {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
  }
}

// create columns
for (let i = 0; i < COLS; i++) {
  columns.push(new Column(i, random(1000, 100)));
  //columns[i].chars.push(new Char(letterSet[random(26)], i, 1));
}

function update() {
  move();
  draw();
  requestAnimationFrame(update);
}
update();

function move() {
}

columns.forEach((column, x, arr) => {
  setInterval(() => {
    column.chars.unshift(
      new Char(
        letterSet[random(letterSet.length - 1)], // type
        x,                    // x pos
        column.chars.length   // y pos
      )
    );
  }, column.intv)
})


function draw() {
  columns.forEach((col, i) => {
    if(col.chars.length === 0) return; // skip empty first row until it is created
    ctx.fillStyle = "lime";
    ctx.font = "1px Arial";
    ctx.fillText(
      col.chars[0].type,
      col.chars[0].x,
      col.chars[0].y,
    );
  })
}
