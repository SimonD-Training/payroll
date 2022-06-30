//.....Requirements.....//
const express = require("express");

//.....Initializing Router.....//
let router = express.Router();

//.....Middleware Object.....//
const middleware = require("../middlewares/sessionware");

//.....Models.....//
const employees = require("./models/employees");

//......API Routes.....//
//Create
router.post("/employee", employees.createEmployee);
router.post("/employee_event", employees.createEmployeeEvent);

//Read
router.get("/employee", employees.getDeptEmployees);

//Update
router.get("/employee", employees.updateDeptEmployee);

//Delete

module.exports = router;
