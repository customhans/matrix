const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 200;
canvas.height = 400;
ctx.scale(20, 20);

const COLS = 10;
const ROWS = 20;
const columns = [];

const letterSet = "abcdefghijklmnopqrstuvwxyz".split("");

function drawCanvas(x, y, w, h) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, w, h);
}
drawCanvas(0, 0, canvas.width, canvas.height);


function random(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Column {
  constructor(x, delay) {
    this.x = x;
    this.delay = delay;
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
  columns.push(new Column(i, random(3000)));
  //columns[i].chars.push(new Char(letterSet[random(26)], i, 1));
}

function update() {
  draw();
  requestAnimationFrame(update);
}
update();

setInterval( () => {
  columns.forEach((column, x, arr) => {
    setTimeout(() => {
  
        column.chars.unshift(
          new Char(
            letterSet[random(letterSet.length - 1)], // type
            x,                    // x pos
            column.chars.length   // y pos
          )
        );
    }, column.delay)
  })
}, 100)


function draw() {
  columns.forEach((col, i) => {
    if (col.chars.length === 0) return; // skip empty first row until it is created
    ctx.fillStyle = "lime";
    ctx.font = "1px Arial";
    ctx.fillText(
      col.chars[0].type,
      col.chars[0].x,
      col.chars[0].y,
    );
  })
}
