import random from "../helpers.js";
import { canvas, ctx, drawCanvas } from "./canvas.js";
import { columns } from "./columns.js";
const MATRIX_CHARS = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789".split("");
const FONT = "1px Arial";
const CHAR_SET = location.search ? location.search.substring(1) : MATRIX_CHARS;
const OPAC_FACTOR = 0.002;
const CHAR_SWAP_INTV = 30;


class Char {
  constructor(x, y) {
    this.char = CHAR_SET[random(CHAR_SET.length - 1)];
    this.x = x;
    this.y = y;
    this.opac = 0.75;
  }
  
  static move() {
    columns.forEach(column => {
      column.chars.forEach(char => {
        char.y += 0.15;
      })
    })
  }

  static swapRandomCharsAndOpacity() {
    for (let i = 0; i < CHAR_SWAP_INTV; i++) {
      let randCol = random(columns.length - 1);
      columns[randCol].chars[random(columns[randCol].chars.length - 1)].char = CHAR_SET[random(CHAR_SET.length - 1)];
      columns[randCol].chars[random(columns[randCol].chars.length - 1)].opac = Math.random();
    }
  }
  
  static draw() {
    drawCanvas();
    ctx.font = FONT;
    columns.forEach(column => {
      column.chars.forEach(char => {

        // draw chars, but only the ones visible on the canvas
        if (char.y > 0) {
          ctx.fillStyle = `rgba(0, 255, 0, ${ char.opac })`;
          ctx.fillText(char.char, char.x, char.y + 1);
        } 

        // make first char white
        if (column.chars.indexOf(char) === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${ char.opac })`;
          ctx.fillText(char.char, char.x, char.y + 1);
        }
 
        // add opacity
        if (char.y > canvas.height / random(30)) {
          char.opac -= Math.random() * OPAC_FACTOR * char.y;
        }
      })
    })
  }
}

export { CHAR_SET }
export default Char;