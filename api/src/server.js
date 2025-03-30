// setup
require("./db/setup").setup_urls();

// app
const express = require("express");
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`MiniatURL API listenting at http://localhost:${ port }`);
})