//.....Requirements.....//
const database = require("../../lib/db/db");

exports.updateDepartment = (req, res) => {
    database.query(
        "UPDATE departments SET overtime_limit = ? WHERE department_id = ?;",
        [req.body.overtime_limit, req.body.department_id],
        (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(409);
            } else res.send(true);
        }
    );
};

exports.getDepartmentSummary = (req, res) => {
    database.query(
        "SELECT SUM(salary) as total FROM payroll NATURAL JOIN departments WHERE department_id = ?;",
        [req.session.department],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else res.send(result[0].total.toString());
        }
    );
};
