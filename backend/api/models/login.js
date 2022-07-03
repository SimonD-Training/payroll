//.....Requirements.....//
const database = require("../../lib/db/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
    database.query(
        "SELECT * FROM login NATURAL JOIN departments WHERE email = ?;",
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
                                    req.session.logtype = "supervisor";
                                    req.session.department = result[0].department_id;
                                    res.send(
                                        "/supervisor"
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
