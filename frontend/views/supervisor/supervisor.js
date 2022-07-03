const database = require("../../../backend/lib/db/db");

const supervisor = (req, res) => {
    database.query(
        "SELECT * FROM employees WHERE department_id = ?;",
        [req.session.department],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else {
                database.query(
                    "SELECT * FROM employee_records NATURAL JOIN employees WHERE department_id = ?;",
                    [req.session.department],
                    (err, result2) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(404);
                        }
                        res.render("supervisor/supervisor", {
                            employees: result,
                            employee_events: result2,
                        });
                    }
                );
            }
        }
    );
};

module.exports = supervisor;
