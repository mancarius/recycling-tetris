/**
 * Create a waves animation
 * 
 * @param this an HTML image element
 * @param canvas Canvas element to animate
 */
export function canvasWavesAnimation(this: GlobalEventHandlers, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d"),
    w = canvas.width,
    h = canvas.height;

  if (ctx === null) return;

  const image = this as HTMLImageElement;

  ctx.drawImage(image, 0, 0);

  const o1 = new Osc(0.05),
    o2 = new Osc(0.03),
    o3 = new Osc(0.06), // osc. for vert
    o4 = new Osc(0.08),
    o5 = new Osc(0.04),
    o6 = new Osc(0.067), // osc. for hori
    // source grid lines
    x0 = 0,
    x1 = w * 0.25,
    x2 = w * 0.5,
    x3 = w * 0.75,
    x4 = w,
    y0 = 0,
    y1 = h * 0.25,
    y2 = h * 0.5,
    y3 = h * 0.75,
    y4 = h,
    // cache source widths/heights
    sw0 = x1,
    sw1 = x2 - x1,
    sw2 = x3 - x2,
    sw3 = x4 - x3,
    sh0 = y1,
    sh1 = y2 - y1,
    sh2 = y3 - y2,
    sh3 = y4 - y3,
    vcanvas = document.createElement("canvas"), // off-screen canvas for 2. pass
    vctx = vcanvas.getContext("2d");

  vcanvas.width = w;
  vcanvas.height = h; // set to same size as main canvas

  (function loop() {
    ctx.clearRect(0, 0, w, h);

    for (var y = 0; y < h; y++) {
      // segment positions
      var lx1 = x1 + o1.current(y * 0.2) * 2.5,
        lx2 = x2 + o2.current(y * 0.2) * 2,
        lx3 = x3 + o3.current(y * 0.2) * 1.5,
        // segment widths
        w0 = lx1,
        w1 = lx2 - lx1,
        w2 = lx3 - lx2,
        w3 = x4 - lx3;

      // draw image lines
      ctx.drawImage(image, x0, y, sw0, 1, 0, y, w0, 1);
      ctx.drawImage(image, x1, y, sw1, 1, lx1 - 0.5, y, w1 + 0.5, 1);
      ctx.drawImage(image, x2, y, sw2, 1, lx2 - 0.5, y, w2 + 0.5, 1);
      ctx.drawImage(image, x3, y, sw3, 1, lx3 - 0.5, y, w3 + 0.5, 1);
    }

    // pass 1 done, copy to off-screen canvas:
    vctx!.clearRect(0, 0, w, h); // clear off-screen canvas (only if alpha)
    vctx!.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, w, h); // clear main (onlyif alpha)

    for (var x = 0; x < w; x++) {
      var ly1 = y1 + o4.current(x * 0.32),
        ly2 = y2 + o5.current(x * 0.3) * 2,
        ly3 = y3 + o6.current(x * 0.4) * 1.5;

      ctx.drawImage(vcanvas, x, y0, 1, sh0, x, 0, 1, ly1);
      ctx.drawImage(vcanvas, x, y1, 1, sh1, x, ly1 - 0.5, 1, ly2 - ly1 + 0.5);
      ctx.drawImage(vcanvas, x, y2, 1, sh2, x, ly2 - 0.5, 1, ly3 - ly2 + 0.5);
      ctx.drawImage(vcanvas, x, y3, 1, sh3, x, ly3 - 0.5, 1, y4 - ly3 + 0.5);
    }

    requestAnimationFrame(loop);
  })();
}

class Osc {
  current: (x: number) => number;

  constructor(speed: number) {
    var frame = 0;

    this.current = function (x: number) {
      frame += 0.001 * speed;
      return Math.sin(frame + x * speed * 30);
    };
  }
}
