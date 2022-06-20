//.....Requirements.....//
const database = require("../../lib/db/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
    database.query(
        "SELECT password FROM login WHERE email = ?;",
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
                        else if (same) res.send(true);
                        else res.status(401).send(false);
                    }
                );
        }
    );
};
