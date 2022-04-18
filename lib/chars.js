import random from "../helpers.js";
import { canvas, ctx, drawCanvas } from "./canvas.js";
import { columns } from "./columns.js";
const FONT = "1px Arial";
const CHAR_SET = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789".split("");
const OPAC_FACTOR = 0.002;

class Char {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.opac = 0.75;
  }
  
  static move() {
    columns.forEach(column => {
      column.chars.forEach(char => {
        char.y++;
      })
    })
  }
  
  static draw() {
    drawCanvas();
    ctx.font = FONT;
    columns.forEach(column => {
      column.chars.forEach(char => {
        if (char.y > 0) {
          ctx.fillStyle = `rgba(0, 255, 0, ${ char.opac })`;
          ctx.fillText(char.char, char.x, char.y + 1);
        } 
        if (column.chars.indexOf(char) === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${ char.opac })`;
          ctx.fillText(char.char, char.x, char.y + 1);

        }
        if (char.y > canvas.height / random(20)) {
          char.opac -= Math.random() * OPAC_FACTOR * char.y;
        }
      })
    })
    
  }
}


export { CHAR_SET };
export default Char;