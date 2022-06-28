//.....Requirements.....//
const express = require("express");

//.....Initializing Router.....//
let router = express.Router();

//.....Middleware Object.....//
const middleware = require("../middlewares/sessionware");

//......API Routes.....//
//Create
router.post("/createEmployee", emplopyees.createEmployee);
router.post("/employeeEvent", emplopyees.createEmployeeEvent);

//Read
router.get("/total-salary", emplopyees.getEmployee);

//Update
router.get("/department-update", emplopyees.updateDeptEmployee);

//Delete

router.module.exports = router;
