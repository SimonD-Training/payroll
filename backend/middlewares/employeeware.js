const employeeware = (req, res, next) => {
    if (req.session.logtype != "employee") res.sendStatus(401);
    else next();
}

module.exports = employeeware;