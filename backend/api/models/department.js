//.....Requirements.....//
const database = require("../../lib/db/db");

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
