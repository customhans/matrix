const canvas = document.querySelector("canvas");
canvas.width = 400;
canvas.height = 800;
const ctx = canvas.getContext("2d");
const COLS = 20;
const ROWS = 40;
const RANDOM_LETTERS = "01".split("");
const columns = [];
const INITIAL_DELAY = 100;

class Column {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.v = +(getRandom(100)).toFixed(2);
    this.delay = getRandom(10000)
    this.letters = [];
  }
}

class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
  }
}

function getRandom(n) {
  return Math.floor(Math.random() * n);
}

function getRandomLetter() {
  const rand = getRandom(RANDOM_LETTERS.length);
  return RANDOM_LETTERS[rand];
}

(function createColumns() {
  for (let i = 0; i < COLS; i++) {
    columns.push(new Column(i * 20, 0))
  }
})();


function drawCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
drawCanvas();


//fillColumnsWithLetters();

setInterval(function () {
  fillColumnsWithLetters();
  //drawCanvas()
  draw();
}, 100)

function fillColumnsWithLetters() {
  columns.forEach((column, x) => {
    setTimeout(function() {
      column.letters.push(new Letter(getRandomLetter(), x, column.letters.length))
    }, column.delay)
  })
}


// function fillColumnsWithLetters() {
//   columns.forEach((column, i) => {
//     // setTimeout(function () {

//       getEmLetters(column, i);

//     // }, column.v * INITIAL_DELAY);

//     if (column.letters.length >= 40) {

//       column.letters.forEach((letter, idx, arr) => arr[idx] = "");



//     }
//   })
// }



// function draw() {
//   columns.forEach((col, i) => {
//     col.letters.forEach((letter, j) => {
//       if (letter) {
//         ctx.font = "20px Arial";
//         ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
//         ctx.fillText(letter.char, i * 20, j * 20);
//       }
//     })
//   })
// }

function draw() {
  columns.forEach(column => {
      column.letters.forEach(letter => {
        ctx.font = "20px Arial";
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.fillText(letter.char, letter.x * 20, letter.y * 20);
      })
  })
}