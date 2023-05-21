/*
Pausing the game
Make it possible to pause (suspend) and unpause the game by pressing the Esc key.

This can be done by changing the runLevel function to use another keyboard event handler and interrupting or resuming the animation whenever the Esc key is hit.

The runAnimation interface may not look like it is suitable for this at first glance, but it is if you rearrange the way runLevel calls it.

When you have that working, there is something else you could try. The way we have been registering keyboard event handlers is somewhat problematic. The arrowKeys object is currently a global binding, and its event handlers are kept around even when no game is running. You could say they leak out of our system. Extend trackKeys to provide a way to unregister its handlers and then change runLevel to register its handlers when it starts and unregister them again when it is finished.

<link rel="stylesheet" href="css/game.css">

<body>
<script>
  // The old runLevel function. Modify this...
  function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    return new Promise(resolve => {
      runAnimation(time => {
        state = state.update(time, arrowKeys);
        display.syncState(state);
        if (state.status == "playing") {
          return true;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          resolve(state.status);
          return false;
        }
      });
    });
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
  // To know when to stop and restart the animation, a level that is
  // being displayed may be in three `running` states:
  //
  // * "yes":     Running normally.
  // * "no":      Paused, animation isn't running
  // * "pausing": Must pause, but animation is still running
  //
  // The key handler, when it notices escape being pressed, will do a
  // different thing depending on the current state. When running is
  // "yes" or "pausing", it will switch to the other of those two
  // states. When it is "no", it will restart the animation and switch
  // the state to "yes".
  //
  // The animation function, when state is "pausing", will set the state
  // to "no" and return false to stop the animation.

  function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let running = "yes";

    return new Promise(resolve => {
      function escHandler(event) {
        if (event.key != "Escape") return;
        event.preventDefault();
        if (running == "no") {
          running = "yes";
          runAnimation(frame);
        } else if (running == "yes") {
          running = "pausing";
        } else {
          running = "yes";
        }
      }
      window.addEventListener("keydown", escHandler);
      let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

      function frame(time) {
        if (running == "pausing") {
          running = "no";
          return false;
        }

        state = state.update(time, arrowKeys);
        display.syncState(state);
        if (state.status == "playing") {
          return true;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          window.removeEventListener("keydown", escHandler);
          arrowKeys.unregister();
          resolve(state.status);
          return false;
        }
      }
      runAnimation(frame);
    });
  }

  function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
      if (keys.includes(event.key)) {
        down[event.key] = event.type == "keydown";
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    down.unregister = () => {
      window.removeEventListener("keydown", track);
      window.removeEventListener("keyup", track);
    };
    return down;
  }

  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>
