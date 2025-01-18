const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = require("../db"); // Centralized DB connection

router.post("/", (req, res) => {
    const { userID, brandName, website, email, profilePicture } = req.body;
  
    if (!userID || !brandName || !website || !email || !profilePicture) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    const sql = `
        UPDATE users
        SET brandname = ?, website = ?, email = ?, profilepicture = ?
        WHERE uid = ?
    `;
  
    db.query(sql, [brandName, website, email, profilePicture, userID ], (err, results) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).send("Server error");
      }
  
      res.json({ success: true, message: "Profile updated successfully!" });
    });
  });

  module.exports = router;
