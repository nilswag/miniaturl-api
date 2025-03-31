const express = require("express");
const router = express.Router();
const url_controller = require("../controllers/url_controller");

router.post("/add", url_controller.add_url);

module.exports = { router };