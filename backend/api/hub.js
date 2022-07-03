//.....Requirements.....//
const express = require("express");
const accountsware = require("../middlewares/accountsware");
const supervisorware = require("../middlewares/supervisorware");

//.....Initializing Router.....//
let router = express.Router();

//.....Middleware Object.....//


//.....Models.....//
const { updateDepartment, getDepartmentSummary } = require("./models/department");
const { createEmployee, createEmployeeEvent, getDeptEmployees, updateDeptEmployee, updateEmployee, getSupEmployees, createDeptEmployee, updateEmployeeEvent } = require("./models/employees");
const { login } = require("./models/login");
const { getSalary, getDeptSalary } = require("./models/salary");

//......API Routes.....//
//Create
router.post("/employee", accountsware, createEmployee);
router.post("/sup/employee", supervisorware, createDeptEmployee);
router.post("/employee_event", supervisorware, createEmployeeEvent);

//Read
router.get("/api/dept/employees", supervisorware, getDeptEmployees);
router.get("/api/sup/summary", supervisorware, getDepartmentSummary);
router.get("/api/sup/employees", accountsware, getSupEmployees);
router.get("/api/salary", accountsware, getSalary);
router.get("/api/salary_dept", supervisorware, getDeptSalary);
router.post("/login", login);

//Update
router.put("/dept/employee/:id", supervisorware, updateDeptEmployee);
router.put("/employee/:id", accountsware, updateEmployee);
router.put("/dept/:id", supervisorware, updateDepartment);
router.put("/employee_event/:id", supervisorware, updateEmployeeEvent);

//Delete

module.exports = router;
