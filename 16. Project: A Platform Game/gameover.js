/*
Game over
It’s traditional for platform games to have the player start with a limited number of lives and subtract one life each time they die. When the player is out of lives, the game restarts from the beginning.

Adjust runGame to implement lives. Have the player start with three. Output the current number of lives (using console.log) every time a level starts.

<link rel="stylesheet" href="css/game.css">

<body>
<script>
  // The old runGame function. Modify it...
  async function runGame(plans, Display) {
    for (let level = 0; level < plans.length;) {
      let status = await runLevel(new Level(plans[level]),
                                  Display);
      if (status == "won") level++;
    }
    console.log("You've won!");
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>
*/
<!doctype html>
<script src="code/chapter/16_game.js"></script>
<script src="code/levels.js"></script>

<link rel="stylesheet" href="css/game.css">

<body>
<script>
  // The old runGame function. Modify it...
  async function runGame(plans, Display) {
    let lives = 3;
    for (let level = 0; level < plans.length && lives > 0;) {
      console.log(`Level ${level + 1}, lives: ${lives}`);
      let status = await runLevel(new Level(plans[level]),
                                  Display);
      if (status == "won") level++;
      else lives--;
    }
    if (lives > 0) {
      console.log("You've won!");
    } else {
      console.log("Game over");
    }
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>
