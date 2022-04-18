import random from "../helpers.js";
import { canvas, ctx, drawCanvas } from "./canvas.js";
import { columns } from "./columns.js";
const FONT = "1px Arial";
const CHAR_SET = "0123456789".split("");
const OPAC_FACTOR = 0.002;

//const CHAR_SET = "abcdefghijklmnopqrstuvwxyz".split("");

class Char {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.opac = 1;
  }
}

function move() {
  columns.forEach(column => {
    column.chars.forEach(char => {
      char.y++;
    })
  })
}

function draw() {
  drawCanvas();
  ctx.font = FONT;
  columns.forEach((column, i) => {
    column.chars.forEach((char, j) => {
      if (char.y > 0) {
        ctx.fillStyle = `rgba(0, 255, 0, ${ char.opac })`;
        ctx.fillText(char.char, char.x, char.y + 1);
      }
      if (char.y > canvas.height / random(25, 22)) {
        char.opac -= Math.random() * OPAC_FACTOR * char.y;
      }
    })
  })
}

export { CHAR_SET, move, draw };
export default Char;