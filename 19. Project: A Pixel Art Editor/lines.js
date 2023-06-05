/*
This is a more advanced exercise than the preceding two, and it will require you to design a solution to a nontrivial problem. Make sure you have plenty of time and patience before starting to work on this exercise, and do not get discouraged by initial failures.

On most browsers, when you select the draw tool and quickly drag across the picture, you don’t get a closed line. Rather, you get dots with gaps between them because the "mousemove" or "touchmove" events did not fire quickly enough to hit every pixel.

Improve the draw tool to make it draw a full line. This means you have to make the motion handler function remember the previous position and connect that to the current one.

To do this, since the pixels can be an arbitrary distance apart, you’ll have to write a general line drawing function.

A line between two pixels is a connected chain of pixels, as straight as possible, going from the start to the end. Diagonally adjacent pixels count as a connected. So a slanted line should look like the picture on the left, not the picture on the right.

Two pixelated lines, one light, skipping across pixels diagonally, and one heavy, with all pixels connected horizontally or vertically
Finally, if we have code that draws a line between two arbitrary points, we might as well use it to also define a line tool, which draws a straight line between the start and end of a drag.

<div></div>
<script>
  // The old draw tool. Rewrite this.
  function draw(pos, state, dispatch) {
    function drawPixel({x, y}, state) {
      let drawn = {x, y, color: state.color};
      dispatch({picture: state.picture.draw([drawn])});
    }
    drawPixel(pos, state);
    return drawPixel;
  }

  function line(pos, state, dispatch) {
    // Your code here
  }

  let dom = startPixelEditor({
    tools: {draw, line, fill, rectangle, pick}
  });
  document.querySelector("div").appendChild(dom);
</script>
*/
<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  function drawLine(from, to, color) {
    let points = [];
    if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
      if (from.x > to.x) [from, to] = [to, from];
      let slope = (to.y - from.y) / (to.x - from.x);
      for (let {x, y} = from; x <= to.x; x++) {
        points.push({x, y: Math.round(y), color});
        y += slope;
      }
    } else {
      if (from.y > to.y) [from, to] = [to, from];
      let slope = (to.x - from.x) / (to.y - from.y);
      for (let {x, y} = from; y <= to.y; y++) {
        points.push({x: Math.round(x), y, color});
        x += slope;
      }
    }
    return points;
  }

  function draw(pos, state, dispatch) {
    function connect(newPos, state) {
      let line = drawLine(pos, newPos, state.color);
      pos = newPos;
      dispatch({picture: state.picture.draw(line)});
    }
    connect(pos, state);
    return connect;
  }

  function line(pos, state, dispatch) {
    return end => {
      let line = drawLine(pos, end, state.color);
      dispatch({picture: state.picture.draw(line)});
    };
  }

  let dom = startPixelEditor({
    tools: {draw, line, fill, rectangle, pick}
  });
  document.querySelector("div").appendChild(dom);
</script>
