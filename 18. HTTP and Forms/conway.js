/*
Conway’s Game of Life
Conway’s Game of Life is a simple simulation that creates artificial “life” on a grid, each cell of which is either alive or not. Each generation (turn), the following rules are applied:

Any live cell with fewer than two or more than three live neighbors dies.

Any live cell with two or three live neighbors lives on to the next generation.

Any dead cell with exactly three live neighbors becomes a live cell.

A neighbor is defined as any adjacent cell, including diagonally adjacent ones.

Note that these rules are applied to the whole grid at once, not one square at a time. That means the counting of neighbors is based on the situation at the start of the generation, and changes happening to neighbor cells during this generation should not influence the new state of a given cell.

Implement this game using whichever data structure you find appropriate. Use Math.random to populate the grid with a random pattern initially. Display it as a grid of checkbox fields, with a button next to it to advance to the next generation. When the user checks or unchecks the checkboxes, their changes should be included when computing the next generation.

<div id="grid"></div>
<button id="next">Next generation</button>

<script>
  // Your code here.
</script>
*/
<!doctype html>
<script src="code/chapter/18_http.js"></script>

<div id="grid"></div>
<button id="next">Next generation</button>
<button id="run">Auto run</button>

<script>
  const width = 30, height = 15;

  // I will represent the grid as an array of booleans.

  let gridNode = document.querySelector("#grid");
  // This holds the checkboxes that display the grid in the document.
  let checkboxes = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let box = document.createElement("input");
      box.type = "checkbox";
      gridNode.appendChild(box);
      checkboxes.push(box);
    }
    gridNode.appendChild(document.createElement("br"));
  }

  function gridFromCheckboxes() {
    return checkboxes.map(box => box.checked);
  }
  function checkboxesFromGrid(grid) {
    grid.forEach((value, i) => checkboxes[i].checked = value);
  }
  function randomGrid() {
    let result = [];
    for (let i = 0; i < width * height; i++) {
      result.push(Math.random() < 0.3);
    }
    return result;
  }

  checkboxesFromGrid(randomGrid());

  // This does a two-dimensional loop over the square around the given
  // x,y position, counting all fields that have a cell but are not the
  // center field.
  function countNeighbors(grid, x, y) {
    let count = 0;
    for (let y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
      for (let x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
        if ((x1 != x || y1 != y) && grid[x1 + y1 * width]) {
          count++;
        }
      }
    }
    return count;
  }

  function nextGeneration(grid) {
    let newGrid = new Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let neighbors = countNeighbors(grid, x, y);
        let offset = x + y * width;
        if (neighbors < 2 || neighbors > 3) {
          newGrid[offset] = false;
        } else if (neighbors == 2) {
          newGrid[offset] = grid[offset];
        } else {
          newGrid[offset] = true;
        }
      }
    }
    return newGrid;
  }

  function turn() {
    checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
  }

  document.querySelector("#next").addEventListener("click", turn);

  let running = null;
  document.querySelector("#run").addEventListener("click", () => {
    if (running) {
      clearInterval(running);
      running = null;
    } else {
      running = setInterval(turn, 400);
    }
  });
</script>
