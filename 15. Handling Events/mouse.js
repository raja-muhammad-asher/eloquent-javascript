/*
Mouse trail
In JavaScript’s early days, which was the high time of gaudy home pages with lots of animated images, people came up with some truly inspiring ways to use the language.

One of these was the mouse trail—a series of elements that would follow the mouse pointer as you moved it across the page.

In this exercise, I want you to implement a mouse trail. Use absolutely positioned <div> elements with a fixed size and background color (refer to the code in the “Mouse Clicks” section for an example). Create a bunch of such elements and, when the mouse moves, display them in the wake of the mouse pointer.

There are various possible approaches here. You can make your solution as simple or as complex as you want. A simple solution to start with is to keep a fixed number of trail elements and cycle through them, moving the next one to the mouse’s current position every time a "mousemove" event occurs.

<style>
  .trail 
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<script>
  // Your code here.
</script>
*/
<!doctype html>

<style>
  .trail { /* className for the trail elements */
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<body>
<script>
  let dots = [];
  for (let i = 0; i < 12; i++) {
    let node = document.createElement("div");
    node.className = "trail";
    document.body.appendChild(node);
    dots.push(node);
  }
  let currentDot = 0;
  
  window.addEventListener("mousemove", event => {
    let dot = dots[currentDot];
    dot.style.left = (event.pageX - 3) + "px";
    dot.style.top = (event.pageY - 3) + "px";
    currentDot = (currentDot + 1) % dots.length;
  });
</script>
</body>
