/*
Efficient drawing
During drawing, the majority of work that our application does happens in drawPicture. Creating a new state and updating the rest of the DOM isn’t very expensive, but repainting all the pixels on the canvas is quite a bit of work.

Find a way to make the syncState method of PictureCanvas faster by redrawing only the pixels that actually changed.

Remember that drawPicture is also used by the save button, so if you change it, either make sure the changes don’t break the old use or create a new version with a different name.

Also note that changing the size of a <canvas> element, by setting its width or height properties, clears it, making it entirely transparent again.

<div></div>
<script>
  // Change this method
  PictureCanvas.prototype.syncState = function(picture) {
    if (this.picture == picture) return;
    this.picture = picture;
    drawPicture(this.picture, this.dom, scale);
  };

  // You may want to use or change this as well
  function drawPicture(picture, canvas, scale) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        cx.fillStyle = picture.pixel(x, y);
        cx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({}));
</script>
*/
<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  PictureCanvas.prototype.syncState = function(picture) {
    if (this.picture == picture) return;
    drawPicture(picture, this.dom, scale, this.picture);
    this.picture = picture;
  }

  function drawPicture(picture, canvas, scale, previous) {
    if (previous == null ||
        previous.width != picture.width ||
        previous.height != picture.height) {
      canvas.width = picture.width * scale;
      canvas.height = picture.height * scale;
      previous = null;
    }

    let cx = canvas.getContext("2d");
    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        let color = picture.pixel(x, y);
        if (previous == null || previous.pixel(x, y) != color) {
          cx.fillStyle = color;
          cx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({}));
</script>
