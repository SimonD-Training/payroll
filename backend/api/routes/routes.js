//.....Requirements.....//
const express = require("express");

//.....Initializing Router.....//
let router = express.Router();

//.....Middleware.....//
const employeeware = require("../../middlewares/employeeware");
const supervisorware = require("../../middlewares/supervisorware");
const accountsware = require("../../middlewares/accountsware");

//......Page Routes.....//
const index = require("../../../frontend/views/index/index");
const { logout } = require("../models/login");
router.get("/", (req, res) => {
    res.redirect("/home");
});
router.get("/home", index);

//Employees
router.get("/profile/:id", employeeware, require("../../../frontend/views/profile/profile"));

//Supervisors
router.get("/supervisor", supervisorware, require("../../../frontend/views/supervisor/supervisor"));
router.get("/supervisor/edit_event/:id", supervisorware, require("../../../frontend/views/edit_event/edit_event"));
router.get("/supervisor/edit_salary/:id", supervisorware, require("../../../frontend/views/edit_salary_dept/edit_salary_dept"));

//Accounts Department
router.get("/accounts", accountsware, require("../../../frontend/views/accounts/accounts"));
router.get("/accounts/edit_salary/:id", accountsware, require("../../../frontend/views/edit_salary/edit_salary"));

router.get("/logout", logout)


module.exports = router;