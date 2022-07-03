//.....Requirements.....//
const express = require("express");
const accountsware = require("../middlewares/accountsware");
const supervisorware = require("../middlewares/supervisorware");

//.....Initializing Router.....//
let router = express.Router();

//.....Middleware Object.....//


//.....Models.....//
const { getDepartmentSummary } = require("./models/department");
const { createEmployee, createEmployeeEvent, getDeptEmployees, updateDeptEmployee, updateEmployee, getSupEmployees, createDeptEmployee, updateEmployeeEvent } = require("./models/employees");
const { login } = require("./models/login");
const { getSalary, getDeptSalary, getSalaryId, updatePayroll, processPay } = require("./models/salary");

//......API Routes.....//
//Create
router.post("/employee", accountsware, createEmployee);
router.post("/sup/employee", supervisorware, createDeptEmployee);
router.post("/employee_event", supervisorware, createEmployeeEvent);

//Read
router.get("/api/dept/employees", supervisorware, getDeptEmployees);
router.get("/api/sup/summary", supervisorware, getDepartmentSummary);
router.get("/api/sup/employees/:id", accountsware, getSupEmployees);
router.get("/api/salary/:id?*", accountsware, getSalary);
router.get("/api/salary/:id", accountsware, getSalaryId);
router.get("/api/salary_dept", supervisorware, getDeptSalary);
router.get("/api/generate/payroll?*", supervisorware, processPay);
router.post("/login", login);

//Update
router.put("/dept/employee/:id", supervisorware, updateDeptEmployee);
router.put("/employee/:id", accountsware, updateEmployee);
router.put("/employee_event/:id", supervisorware, updateEmployeeEvent);
router.put("/salary/:id", accountsware, updatePayroll);

//Delete

module.exports = router;
