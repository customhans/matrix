import { ctx } from "./lib/canvas.js";
import Char from "./lib/chars.js";
import Column from "./lib/columns.js";

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