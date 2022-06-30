const shareware = (req, res, next) => {
    if (req.session.logtype != "accounts" && req.session.logtype != "supervisor") res.sendStatus(401);
    else next();
}

module.exports = shareware;