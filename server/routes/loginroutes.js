const express = require("express");
const router = express.Router();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const db = require("../db"); // Centralized DB connection

router.use(cors());
router.use(express.json());

router.post('/checkUserCredentials', (req, res) => {
    const UserName = String(req.body.UserName);
    const hash = String(req.body.Password);

    let sql = `SELECT uid, role FROM users WHERE username = ? AND password = ?`;
    db.query(sql, [UserName, hash], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

router.post('/authenticateUser', (req, res) => {
    const username = req.body.UserName;
    const password = req.body.Password;

    const jwtToken = jwt.sign(
        {username: username, password: password},
        'secret',
    )

    const obj = {
        message: "authenticated",
        token: jwtToken,
    }

    res.send(obj);

})

router.post('/createUser', (req, res) => {
    const userName = String(req.body.UserName);
    const userPass = req.body.UserPassword;
    const userType = String(req.body.UserRole);
    const userEmail = String(req.body.UserEmail);

    const values = [userName, userPass, userType, userEmail];

    let sql = `INSERT INTO users(username, password, role, email)
    VALUES (?);`;
      db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

module.exports = router;