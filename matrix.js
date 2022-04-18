import { ctx } from "./lib/canvas.js";
import { draw, move } from "./lib/chars.js";
import { createStartColumns, insertNewColumns } from "./lib/columns.js";

onload = () => {
  ctx.scale(20, 20);
  createStartColumns();

  setInterval(() => {
    move();
    draw();
  }, 100)
}

(function update() {
  requestAnimationFrame(update);
  draw();
  insertNewColumns();
})();
