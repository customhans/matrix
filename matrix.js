import random from "./helpers.js";
import { ctx } from "./lib/canvas.js";
import Char, { CHAR_SET } from "./lib/chars.js";
import Column, { columns } from "./lib/columns.js";

onload = () => {
  ctx.scale(20, 20);
  Column.createStartColumns();
}

(function update() {
  requestAnimationFrame(update);
  Char.move();
  Char.swapRandomChars();
  Char.draw();
  Column.insertNewColumns();
})();