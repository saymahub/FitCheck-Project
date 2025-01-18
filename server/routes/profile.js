const express = require("express");
const router = express.Router();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const db = require("../db"); // Centralized DB connection

router.use(cors());
router.use(express.json());

router.post('/getItems', (req, res) => {
    const UserID = String(req.body.UserID);

    let sql = `SELECT * FROM wardrobe WHERE uid = ?`;
    db.query(sql, [UserID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

router.get('/getUserProfilePicture', (req, res) => {
const UserID = String(req.query.UserID); 

    let sql = `SELECT profilepicture FROM users WHERE uid = ?`;
    db.query(sql, [UserID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result[0]);
    })
})

router.post('/addUserWardrobeItem', (req, res) => {
    const UserID = String(req.body.UserID);
    const ItemType = String(req.body.ItemType);
    const ItemName = String(req.body.ItemName);
    const Picture = String(req.body.Picture);
    const OtherDetails = String(req.body.OtherDetails);

    let sql = `INSERT INTO wardrobe (uid, itemtype, name, picture, otherDetails) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [UserID, ItemType, ItemName, Picture, OtherDetails], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})



module.exports = router;