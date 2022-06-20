//.....Requirements.....//
const express = require("express");

//.....Initializing Router.....//
let router = express.Router();

//.....Middleware.....//
const sessionware = require("../../middleware/sessionware");

//......Page Routes.....//
const index = require("../../../frontend/views/index/index");
router.get("/", index);
const login = require("../../../frontend/views/login/login");
router.get("/", login);

router.get("*", sessionware);

module.exports = router;