const express = require("express");
const router = express.Router();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const db = require("../db"); // Centralized DB connection

router.use(cors());
router.use(express.json());


router.post('/addPost', (req, res) => {

    const picture = req.body.picture; 
    const title = req.body.title; 
    const userID = req.body.userID; 

    let sql = `INSERT INTO userpost (uid, picture, title, avgrating, flag) VALUES (?, ?, ?, 0, 0)`;
    db.query(sql, [userID, picture, title], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

module.exports = router ;