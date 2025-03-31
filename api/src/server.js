
// Setup database
const setup = require("./db/setup");
setup.urls(); // Setup urls table in database

// Server setup
const express = require("express");
const app = express();
const port = 5000;

// Global middleware
app.use(express.json()); // Use json middleware to handle json requests

// Setup routers
app.use("/api/url", require("./routes/url_routes").router);


// Setup
app.listen(port, () => console.log(`Server listening on port ${ port }`));