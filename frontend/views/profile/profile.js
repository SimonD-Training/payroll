const database = require("../../../backend/lib/db/db");

const profile = (req, res) => {
    //Params: id
    database.query(
        "SELECT * FROM payroll NATURAL JOIN employees NATURAL JOIN departments WHERE employee_id = ? ORDER BY pay_cycle DESC;",
        [req.params.id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                res.render("profile/profile", {
                    name: `${result[0].title} ${result[0].fname} ${result[0].lname}`,
                    department: result[0].department_nm,
                    salary: result[0].salary,
                });
            }
        }
    );
};

module.exports = profile;
