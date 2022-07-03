//.....Requirements.....//
const database = require("../../lib/db/db");

exports.getSalary = (req, res) => {
    database.query(
        "SELECT * FROM payroll NATURAL JOIN employees WHERE employee_id = ? AND pay_cycle = ?;",
        [
            req.params.id,
            Math.floor(
                (new Date(req.query.pay_cycle).getTime() + 345_600_000) /
                    604_800_000
            ),
        ],
        (err, result) => {
            if (err || result.length < 1) {
                console.log(err);
                res.sendStatus(404);
            } else res.send(result);
        }
    );
};

exports.getSalaryId = (req, res) => {
    database.query(
        "SELECT * FROM payroll NATURAL JOIN employees WHERE id = ?;",
        [req.params.id],
        (err, result) => {
            if (err || result.length < 1) {
                console.log(err);
                res.sendStatus(404);
            } else res.send(result);
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

exports.processPay = (req, res) => {
    let pay_cycle = Math.floor(
        (new Date().getTime() + 345_600_000) / 604_800_000
    );
    database.query(
        "SELECT * FROM employees WHERE department_id = ?;",
        [req.session.department],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatu(404);
            } else {
                let flag = true;
                [...result].forEach((e) => {
                    if (!flag) return;
                    database.query(
                        "SELECT @hours := SUM(hrs) FROM employee_records WHERE employee_id = ? AND pay_cycle = ?; SET @total_hours = 40 + IFNULL(@hours,0); SELECT @rate := SUM(rate) FROM employees WHERE employee_id = ?;  SET @ot_rate = @rate * 1.5; SET @basic_salary = IF(@total_hours > 40 , 40, @total_hours) * @rate; SET @ot_salary = IF(@total_hours > 40, @total_hours - 40, 0) * @ot_rate; SET @salary = @basic_salary + @ot_salary; DELETE FROM payroll WHERE employee_id = ? AND pay_cycle = ?; INSERT INTO payroll (employee_id, pay_cycle, hrs, basic_salary, salary, supervisor_id) VALUES (?, ?, @total_hours, @basic_salary, @salary, ?);",
                        [
                            e.employee_id,
                            pay_cycle,
                            e.employee_id,
                            e.employee_id,
                            pay_cycle,
                            e.employee_id,
                            pay_cycle,
                            req.session.super,
                        ],
                        (err) => {
                            if (err) {
                                console.log(err);
                                flag = false;
                                res.sendStatus(409);
                            }
                        }
                    );
                });
                if (flag) res.send(flag);
            }
        }
    );
};

exports.updatePayroll = (req, res) => {
    database.query(
        "UPDATE payroll SET pay_cycle = ?, hrs = ?, basic_salary = ?, salary = ? WHERE id = ?;",
        [
            req.body.pay_cycle,
            req.body.hrs,
            req.body.basic_salary,
            req.body.salary,
            req.params.id,
        ],
        (err) => {
            if (err) {
                console.log(err);
                req.sendStatus(409);
            } else res.send(true);
        }
    );
};
