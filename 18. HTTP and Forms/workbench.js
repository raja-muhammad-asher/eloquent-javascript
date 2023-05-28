/*
A JavaScript workbench
Build an interface that allows people to type and run pieces of JavaScript code.

Put a button next to a <textarea> field that, when pressed, uses the Function constructor we saw in Chapter 10 to wrap the text in a function and call it. Convert the return value of the function, or any error it raises, to a string and display it below the text field.

<textarea id="code">return "hi";</textarea>
<button id="button">Run</button>
<pre id="output"></pre>

<script>
  // Your code here.
</script>
*/
<!doctype html>
<script src="code/chapter/18_http.js"></script>

<textarea id="code">return "hi";</textarea>
<button id="button">Run</button>
<pre id="output"></pre>

<script>
  document.querySelector("#button").addEventListener("click", () => {
    let code = document.querySelector("#code").value;
    let outputNode = document.querySelector("#output");
    try {
      let result = Function(code)();
      outputNode.innerText = String(result);
    } catch (e) {
      outputNode.innerText = "Error: " + e;
    }
  });
</script>
