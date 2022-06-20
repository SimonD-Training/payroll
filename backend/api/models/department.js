//.....Requirements.....//
const database = require("../../lib/db/db");

exports.updateDepartment = (req, res) => {
    database.query(
        "UPDATE departments SET overtime_limit = ? WHERE department_id = ?;",
        [req.body.overtime_limit, req.body.department_id],
        (err) => {
            if (err) throw err;
            else res.send(true);
        }
    );
};

