//.....Requirements.....//
const database = require("../../lib/db/db");

exports.createEmployee = (req, res) => {
    database.query(
        "INSERT INTO employees (title, fname, lname, department_id, rate) VALUES (?,?,?,?,?);",
        [
            req.body.title,
            req.body.fname,
            req.body.lname,
            req.body.department_id,
            req.body.rate,
        ],
        (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(409);
            } else res.send(true);
        }
    );
};

exports.createDeptEmployee = (req, res) => {
    database.query(
        "INSERT INTO employees (title, fname, lname, department_id, rate) VALUES (?,?,?,?,?);",
        [
            req.body.title,
            req.body.fname,
            req.body.lname,
            req.session.department,
            req.body.rate,
        ],
        (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(409);
            } else res.send(true);
        }
    );
};

exports.createEmployeeEvent = (req, res) => {
    console.log(req.body);
    database.query(
        "INSERT INTO employee_records (employee_id, date, pay_cycle, event_type, hrs, notes) VALUES (?,?,?,?,?,?);",
        [
            parseInt(req.body.employee_id),
            new Date().toISOString().slice(0, 10),
            Math.floor(
                (new Date(req.body.pay_cycle).getTime() + 345_600_000) /
                    604_800_000
            ),
            req.body.event_type,
            parseFloat(req.body.hrs),
            req.body.notes,
        ],
        (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(409);
            } else res.send(true);
        }
    );
};

exports.getDeptEmployees = (req, res) => {
    database.query(
        "SELECT *, SUM(salary) FROM payroll NATURAL JOIN employees WHERE department_id = ?;",
        [req.body.department_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else res.send(result);
        }
    );
};

exports.getSupEmployees = (req, res) => {
    database.query(
        "SELECT * FROM payroll NATURAL JOIN employees WHERE supervisor_id = ?;",
        [req.params.id],
        (err, result) => {
            if (err || result.length < 1) {
                console.log(err);
                res.sendStatus(404);
            } else res.send(result);
        }
    );
};

exports.getEmployeeEvents = (req, res) => {
    database.query(
        "SELECT * FROM employee_records NATURAL JOIN employees WHERE department_id = ?;",
        [req.session.department],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else res.send(result);
        }
    );
};

exports.updateDeptEmployee = (req, res) => {
    database.query(
        "UPDATE employees SET title = ?, fname = ?, lname = ?, rate = ? WHERE employee_id = ? AND department_id = ?;",
        [
            req.body.title,
            req.body.fname,
            req.body.lname,
            parseFloat(req.body.rate),
            parseInt(req.body.employee_id),
            req.session.department,
        ],
        (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else res.send(true);
        }
    );
};

exports.updateEmployee = (req, res) => {
    database.query(
        "UPDATE eployees SET fname = ?, lname = ?, rate = ? WHERE employee_id = ?;",
        [req.body.fname, req.body.lname, req.body.rate, req.body.employee_id],
        (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else res.send(true);
        }
    );
};

exports.updateEmployeeEvent = (req, res) => {
    database.query(
        "UPDATE employee_records SET employee_id = ?, date = ?, pay_cycle = ?, event_type = ?, hrs = ?, notes = ? WHERE id = ?;",
        [
            parseInt(req.body.employee_id),
            req.body.date,
            parseInt(req.body.pay_cycle),
            req.body.event_type,
            parseFloat(req.body.hrs),
            req.body.notes,
            parseInt(req.params.id),
        ],
        (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(409);
            } else res.send(true);
        }
    );
};
