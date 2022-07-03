const database = require("../../../backend/lib/db/db");

const edit_salary_dept = (req, res) => {
    database.query(
        "SELECT * FROM employees WHERE department_id = ? AND employee_id = ?;",
        [req.session.department, req.params.id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else {
                res.render("edit_salary_dept/edit_salary_dept", {
                    employee: result[0],
                });
            }
        }
    );
};

module.exports = edit_salary_dept;
