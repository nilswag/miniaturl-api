const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello Docker!`);
})

app.listen(port, () => {
  console.log(`MiniatURL API listenting at http://localhost: ${ port }`);
})