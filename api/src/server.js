// Setup database
import * as setup from "./db/setup.js";
setup.url();

// Server setup
import express from "express";
import cookieParser from "cookie-parser";
import { log, error } from "./middleware/log_middleware.js";
import router from "./routes/url_routes.js";

const app = express();

// Global middleware
app.use(express.json());
app.use(cookieParser());
app.use(log);

// Setup routers
app.use("/api/url", router);

// Error middleware (should be last)
app.use(error);

const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
