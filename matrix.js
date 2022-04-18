import { ctx } from "./lib/canvas.js";
import Char from "./lib/chars.js";
import Column from "./lib/columns.js";

onload = () => {
  ctx.scale(17, 17);
  Column.createStartColumns();
}

(function update() {
  requestAnimationFrame(update);
  Char.move();
  Char.draw();
  Column.insertNewColumns();
})();
