import { ctx } from "./lib/canvas.js";
import Char from "./lib/chars.js";
import Column from "./lib/columns.js";

onload = () => {
  ctx.scale(15, 15);
  Column.createStartColumns();

  setInterval(() => {
    Char.move();
    Char.draw();
  }, 100)
}

(function update() {
  requestAnimationFrame(update);
  Char.draw();
  Column.insertNewColumns();
})();
