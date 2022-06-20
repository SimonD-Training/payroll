//.....Requirements.....//
const database = require("../../lib/db/db");

exports.createEmployee = (req, res) => {
    database.query(
        "INSERT INTO employees (fname, lname, trn) VALUES (?,?,?);",
        [req.body.fname, req.body.lname, req.body.trn],
        (err) => {
            if (err) throw err;
            else res.send(true);
        }
    );
};

exports.createEmployeeEvent = (req, res) => {
    database.query(
        "INSERT INTO employee_records (employee_id, date, pay_cycle, event_type, hrs) VALUES (?,?,?,?,?);",
        [req.body.employee_id, req.body.date, req.body.pay_cycle, req.body.event_type, req.body.hrs],
        (err) => {
            if (err) throw err;
            else res.send(true);
        }
    );
};

exports.getDeptEmployees = (req, res) => {
    database.query(
        "SELECT *, SUM(salary) FROM payroll NATURAL JOIN employees WHERE department_id = ?;",
        [req.body.department_id],
        (err, result) => {
            if (err) throw err;
            else res.send(result);
        }
    );
};

exports.updateDeptEmployee = (req, res) => {
    database.query(
        "UPDATE eployees SET fname = ?, lname = ?, rate = ? WHERE employee_id = ? AND department_id = ?;",
        [req.body.fname, req.body.lname, req.body.rate, req.body.employee_id, req.body.department_id],
        (err) => {
            if (err) throw err;
            else res.send(true);
        }
    );
};
