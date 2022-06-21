//.....Requirements.....//
const express = require("express");

//.....Initializing Router.....//
let router = express.Router();

//.....Middleware.....//
const sessionware = require("../../middlewares/sessionware");

//......Page Routes.....//
const index = require("../../../frontend/views/index/index");
router.get("/", index);

router.get("*", sessionware);

module.exports = router;