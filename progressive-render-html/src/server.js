const express = require("express");
const app = express();

app.get("/script.js", async function (req, res) {
  res.sendFile(__dirname + "/script.js");
});

app.get("/", async function (req, res) {
  res.set("Content-Type", "text/html");
  // transfer-encoding, chunked
  res.write('Hello, Jelly...<script src="/script.js"></script>\n');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.write("<br />Step one...\n");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.write("...<script>render('pink')</script>");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.write("<br />Step Two...\n");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.write("...<script>render('gray')</script>");
  res.end();
});

app.listen(8080, function () {
  console.log("server running on 8080...");
});
