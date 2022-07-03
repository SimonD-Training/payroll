//.....Requirements.....//
const database = require("../../lib/db/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
    database.query(
        "SELECT * FROM login WHERE email = ?;",
        [req.body.email],
        (err, result) => {
            if (err) throw err;
            else if (result.length != 1) res.status(409).send(false);
            else
                bcrypt.compare(
                    req.body.password,
                    Buffer.from(result[0].password, "binary").toString(),
                    (err, same) => {
                        if (err) throw err;
                        else if (same) {
                            switch (result[0].login_type) {
                                case 0:
                                    req.session.logtype = "employee";
                                    res.send(
                                        `/profile/${result[0].employee_id}`
                                    );
                                    break;
                                case 1:
                                    database.query(
                                        "SELECT department_id FROM departments WHERE supervisor_id = ?;",
                                        [result[0].supervisor_id],
                                        (err, result2) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                req.session.logtype =
                                                    "supervisor";
                                                req.session.department =
                                                    result2[0].department_id;
                                                req.session.super =
                                                    result[0].supervisor_id;
                                                res.send("/supervisor");
                                            }
                                        }
                                    );
                                    break;
                                case 2:
                                    req.session.logtype = "accounts";
                                    res.send("/accounts");
                                    break;
                            }
                        } else res.status(401).send(false);
                    }
                );
        }
    );
};

exports.logout = (req, res) => {
    if (res.session) req.session.destroy();
    res.redirect("/");
};
