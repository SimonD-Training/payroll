const database = require("../../../backend/lib/db/db");

const edit_event = (req, res) => {
    database.query(
        "SELECT * FROM employee_records NATURAL JOIN employees WHERE department_id = ? AND id = ?;",
        [req.session.department, parseInt(req.params.id)],
        (err, result) => {
            result[0].date = `${new Date(result[0].date).toISOString()}`.slice(0,10);
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else res.render("edit_event/edit_event", { event: result[0] });
        }
    );
};

module.exports = edit_event;
