const express = require("express");
const router = express.Router();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const db = require("../db"); // Centralized DB connection

router.use(cors());
router.use(express.json());

router.get('/', (req, res) => {

    let sql = `SELECT up.*, u.profilepicture AS userPFP FROM userpost up JOIN users u ON up.uid = u.uid ORDER BY up.pid DESC;`;
    db.query(sql, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

router.get("/getRating/:pid", async (req, res) => {
    const postId = req.params.pid; 

    let sql = `SELECT rating FROM userrating WHERE pid = ?`;
    db.query(sql, [postId], (err, result) => {
        if(err){
            res.status(500);
        }
        res.json(result);
    })
})

router.post('/setRating', (req, res) => {
    const userID = req.body.userID;
    const postId = req.body.postId; 
    const newRating = req.body.newRating; 

    let sql = ` INSERT INTO userrating (pid, uid, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating);`;
    db.query(sql, [postId, userID, newRating], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})


router.put('/flag/:pid', (req, res) => {
    const postId = req.params.pid; 
    const { flag } = req.body; 
    const sql = "UPDATE userpost SET flag = ? WHERE pid = ?";
    db.query(sql, [flag, postId], (err, results) => {
      if (err) {
        console.error("Error updating flag status:", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: `Post flag updated successfully to ${flag}` });
    });
});

module.exports = router ;