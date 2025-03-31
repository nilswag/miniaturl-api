
// Setup database
const setup = require("./db/setup");
setup.urls(); // Setup urls table in database

// Server setup
const express = require("express");
const app = express();

// Global middleware
app.use(express.json()); // Use json middleware to handle json requests
app.use(require("./middleware/log_middleware").log); // Use log middleware to log requests

// Setup routers
app.use("/api/url", require("./routes/url_routes").router);

// Error middleware should be last middleware
app.use(require("./middleware/log_middleware").error); // Use error middleware to handle errors


// Setup
const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${ port }`));