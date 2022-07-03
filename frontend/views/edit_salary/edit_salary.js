const database = require("../../../backend/lib/db/db");

const edit_salary = (req, res) => {
    database.query(
        "SELECT * FROM payroll NATURAL JOIN employees WHERE id = ?;",
        [req.params.id],
        (err, result) => {
            if (err || result.length < 1) {
                console.log(err);
                res.sendStatus(404);
            } else {
                res.render("edit_salary/edit_salary", { event: result[0] });
            }
        }
    );
};

module.exports = edit_salary;
