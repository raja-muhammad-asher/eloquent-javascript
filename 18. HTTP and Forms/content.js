/*
Content negotiation
One of the things HTTP can do is called content negotiation. The Accept request header is used to tell the server what type of document the client would like to get. Many servers ignore this header, but when a server knows of various ways to encode a resource, it can look at this header and send the one that the client prefers.

The URL https://eloquentjavascript.net/author is configured to respond with either plaintext, HTML, or JSON, depending on what the client asks for. These formats are identified by the standardized media types text/plain, text/html, and application/json.

Send requests to fetch all three formats of this resource. Use the headers property in the options object passed to fetch to set the header named Accept to the desired media type.

Finally, try asking for the media type application/rainbows+unicorns and see which status code that produces.
*/
const url = "https://eloquentjavascript.net/author";
const types = ["text/plain",
               "text/html",
               "application/json",
               "application/rainbows+unicorns"];

async function showTypes() {
  for (let type of types) {
    let resp = await fetch(url, {headers: {accept: type}});
    console.log(`${type}: ${await resp.text()}\n`);
  }
}

showTypes();
