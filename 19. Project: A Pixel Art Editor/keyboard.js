/*
Keyboard bindings
Add keyboard shortcuts to the application. The first letter of a tool’s name selects the tool, and control-Z or command-Z activates undo.

Do this by modifying the PixelEditor component. Add a tabIndex property of 0 to the wrapping <div> element so that it can receive keyboard focus. Note that the property corresponding to the tabindex attribute is called tabIndex, with a capital I, and our elt function expects property names. Register the key event handlers directly on that element. This means you have to click, touch, or tab to the application before you can interact with it with the keyboard.

Remember that keyboard events have ctrlKey and metaKey (for the command key on Mac) properties that you can use to see whether those keys are held down.

<div></div>
<script>
  // The original PixelEditor class. Extend the constructor.
  class PixelEditor {
    constructor(state, config) {
      let {tools, controls, dispatch} = config;
      this.state = state;

      this.canvas = new PictureCanvas(state.picture, pos => {
        let tool = tools[this.state.tool];
        let onMove = tool(pos, this.state, dispatch);
        if (onMove) {
          return pos => onMove(pos, this.state, dispatch);
        }
      });
      this.controls = controls.map(
        Control => new Control(state, config));
      this.dom = elt("div", {}, this.canvas.dom, elt("br"),
                     ...this.controls.reduce(
                       (a, c) => a.concat(" ", c.dom), []));
    }
    syncState(state) {
      this.state = state;
      this.canvas.syncState(state.picture);
      for (let ctrl of this.controls) ctrl.syncState(state);
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
  class PixelEditor {
    constructor(state, config) {
      let {tools, controls, dispatch} = config;
      this.state = state;

      this.canvas = new PictureCanvas(state.picture, pos => {
        let tool = tools[this.state.tool];
        let onMove = tool(pos, this.state, dispatch);
        if (onMove) {
          return pos => onMove(pos, this.state, dispatch);
        }
      });
      this.controls = controls.map(
        Control => new Control(state, config));
      this.dom = elt("div", {
        tabIndex: 0,
        onkeydown: event => this.keyDown(event, config)
      }, this.canvas.dom, elt("br"),
         ...this.controls.reduce(
           (a, c) => a.concat(" ", c.dom), []));
    }
    keyDown(event, config) {
      if (event.key == "z" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        config.dispatch({undo: true});
      } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
        for (let tool of Object.keys(config.tools)) {
          if (tool[0] == event.key) {
            event.preventDefault();
            config.dispatch({tool});
            return;
          }
        }
      }
    }
    syncState(state) {
      this.state = state;
      this.canvas.syncState(state.picture);
      for (let ctrl of this.controls) ctrl.syncState(state);
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({}));
</script>
