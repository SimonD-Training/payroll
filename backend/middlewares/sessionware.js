sessionware = (req, res, next) => {
    if (!req.session.loggedIn) res.end();
    else if (req.session.loggedIn) next();
}

module.exports = sessionware;
