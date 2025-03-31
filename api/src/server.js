const setup = require("./db/setup").setup_urls();

const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/url", require("./routes/url_routes").router);

app.listen(port, () => {
  console.log(`MiniatURL API listenting at http://localhost:${ port }`);
})