const supervisorware = (req, res, next) => {
    if (req.session.logtype != "supervisor") res.sendStatus(401);
    else next();
}

module.exports = supervisorware;