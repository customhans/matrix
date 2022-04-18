import random from "../helpers.js";
import { canvas, CELL_SIZE } from "./canvas.js";
import Char from "./chars.js";

const COLS = canvas.width / CELL_SIZE;
const MIN_LENGTH = (canvas.height / CELL_SIZE) / 7; // ToDo: Configure this
const MAX_LENGTH = (canvas.height / CELL_SIZE) / 3;
const SPAWN_OFFSET = 100

let columns = [];

class Column {
  constructor(x, chars) {
    this.x = x;
    this.chars = chars;
  }

  static createStartColumns() {
    for (let x = 0; x < COLS; x++) {
  
      // add this to y-pos to get random entry times
      let offset = random(SPAWN_OFFSET);
      columns.push(
        new Column(
          x,
          Array(random(MIN_LENGTH, MAX_LENGTH)).fill()
            .map((_, i) =>
              new Char(
                x,
                -i - offset,
              )),
            )
        )
      }
    }
        
    static insertNewColumns() {
      columns.forEach((column, x) => {
      if (
        column.chars.every(char => char.y > canvas.height / 2) ||
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
                x,
                -i,
            )),
          )
        )
      }
    })
  }
}


export { columns }
export default Column;