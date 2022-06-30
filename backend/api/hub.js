//.....Requirements.....//
const express = require("express");
const accountsware = require("../middlewares/accountsware");
const shareware = require("../middlewares/shareware");
const supervisorware = require("../middlewares/supervisorware");

//.....Initializing Router.....//
let router = express.Router();

//.....Middleware Object.....//


//.....Models.....//
const { updateDepartment } = require("./models/department");
const { createEmployee, createEmployeeEvent, getDeptEmployees, updateDeptEmployee, updateEmployee, getSupEmployees } = require("./models/employees");
const { login } = require("./models/login");
const { getSalary, getDeptSalary } = require("./models/salary");

//......API Routes.....//
//Create
router.post("/employee", shareware, createEmployee);
router.post("/employee_event", supervisorware, createEmployeeEvent);

//Read
router.get("/dept/employees", supervisorware, getDeptEmployees);
router.get("/sup/employees", accountsware, getSupEmployees);
router.get("/salary", accountsware, getSalary);
router.get("/salary_dept", supervisorware, getDeptSalary);
router.post("/login", login);

//Update
router.put("/dept/employee", supervisorware, updateDeptEmployee);
router.put("/employee", accountsware, updateEmployee);
router.put("/dept", supervisorware, updateDepartment);

//Delete

module.exports = router;
