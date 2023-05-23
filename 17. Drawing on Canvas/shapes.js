/*
Shapes
Write a program that draws the following shapes on a canvas:

A trapezoid (a rectangle that is wider on one side)

A red diamond (a rectangle rotated 45 degrees or ¼π radians)

A zigzagging line

A spiral made up of 100 straight line segments

A yellow star

The shapes to draw
When drawing the last two, you may want to refer to the explanation of Math.cos and Math.sin in Chapter 14, which describes how to get coordinates on a circle using these functions.

I recommend creating a function for each shape. Pass the position, and optionally other properties such as the size or the number of points, as parameters. The alternative, which is to hard-code numbers all over your code, tends to make the code needlessly hard to read and modify.

<canvas width="600" height="200"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");

  // Your code here.
</script>
*/
<!doctype html>
<script src="code/chapter/16_game.js"></script>
<script src="code/levels.js"></script>
<script src="code/chapter/17_canvas.js"></script>

<canvas width="600" height="200"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");

  function trapezoid(x, y) {
    cx.beginPath();
    cx.moveTo(x, y);
    cx.lineTo(x + 50, y);
    cx.lineTo(x + 70, y + 50);
    cx.lineTo(x - 20, y + 50);
    cx.closePath();
    cx.stroke();
  }
  trapezoid(30, 30);

  function diamond(x, y) {
    cx.translate(x + 30, y + 30);
    cx.rotate(Math.PI / 4);
    cx.fillStyle = "red";
    cx.fillRect(-30, -30, 60, 60);
    cx.resetTransform();
  }
  diamond(140, 30);

  function zigzag(x, y) {
    cx.beginPath();
    cx.moveTo(x, y);
    for (let i = 0; i < 8; i++) {
      cx.lineTo(x + 80, y + i * 8 + 4);
      cx.lineTo(x, y + i * 8 + 8);
    }
    cx.stroke();
  }
  zigzag(240, 20);

  function spiral(x, y) {
    let radius = 50, xCenter = x + radius, yCenter = y + radius;
    cx.beginPath();
    cx.moveTo(xCenter, yCenter);
    for (let i = 0; i < 300; i++) {
      let angle = i * Math.PI / 30;
      let dist = radius * i / 300;
      cx.lineTo(xCenter + Math.cos(angle) * dist,
                yCenter + Math.sin(angle) * dist);
    }
    cx.stroke();
  }
  spiral(340, 20);

  function star(x, y) {
    let radius = 50, xCenter = x + radius, yCenter = y + radius;
    cx.beginPath();
    cx.moveTo(xCenter + radius, yCenter);
    for (let i = 1; i <= 8; i++) {
      let angle = i * Math.PI / 4;
      cx.quadraticCurveTo(xCenter, yCenter,
                          xCenter + Math.cos(angle) * radius,
                          yCenter + Math.sin(angle) * radius);
    }
    cx.fillStyle = "gold";
    cx.fill();
  }
  star(440, 20);
</script>
