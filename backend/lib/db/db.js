//.....Requirements.....//
const mysql = require("mysql");
const dotenv = require("dotenv");

///.....Initialize Dotenv.....//
dotenv.config();

//.....MySQL Login.....//
let database = mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    user: "payroll_root",
    password: process.env.PASSWORD,
    database: "payroll_main",
});

//.....MySQL Connect.....//
database.connect((err) => {
    console.log(process.env);
    if (err) throw err;
    else console.log("Successful connection to Database.");
});

//.....Export Connection Object.....//
module.exports = database;
