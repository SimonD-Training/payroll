//.....Requirements.....//
const database = require("../../lib/db/db");

exports.getSalary = (req, res) => {
    database.query(
        "SELECT * FROM payroll NATURAL JOIN employees NATURAL JOIN departments WHERE employee_id = ? AND pay_cycle = ?;",
        [req.body.employee_id, req.body.pay_cycle.slice(0, 10)],
        (err, result) => {
            if (err) throw err;
            else res.send(result);
        }
    );
};

exports.getDeptSalary = (req, res) => {
    database.query(
        "SELECT * FROM payroll NATURAL JOIN employees NATURAL JOIN departments WHERE department_id = ?;",
        [req.body.department_id],
        (err, result) => {
            if (err) throw err;
            else res.send(result);
        }
    );
};

