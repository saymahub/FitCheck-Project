const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = require("../db"); // Centralized DB connection

// Route to fetch flagged posts
router.get("/", (req, res) => {
  const sql = `
    SELECT 'userpost' AS source, pid, uid, picture, flag 
    FROM userpost 
    WHERE flag = 1
    UNION
    SELECT 'brandpost' AS source, pid, uid, picture, flag 
    FROM brandpost 
    WHERE flag = 1;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching flagged posts:", err);
      return res.status(500).send("Server error");
    }
    res.json(result); // Send flagged posts to the frontend
  });
});

module.exports = router;
