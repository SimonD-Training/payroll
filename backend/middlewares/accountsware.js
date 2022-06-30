const accountsware = (req, res, next) => {
    if (req.session.logtype != "accounts") res.sendStatus(401);
    else next();
}

module.exports = accountsware;