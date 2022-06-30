//.....Requirements.....//
const database = require("../../lib/db/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
    database.query(
        "SELECT password, login_type FROM login WHERE email = ?;",
        [req.body.password],
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
                                case 2:
                                    req.session.logtype = "employee";
                                    break;
                                case 1:
                                    req.session.logtype = "supervisor";
                                    break;
                                case 0:
                                    req.session.logtype = "accounts";
                                    break;
                            }
                        }
                        else res.status(401).send(false);
                    }
                );
        }
    );
};
